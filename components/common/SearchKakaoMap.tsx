'use client';

import { PLACE_DTO } from '@/types/dto';
import { Checkbox } from '@nextui-org/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';

interface SearchKakaoMapProps {
	setPlace: (place: PLACE_DTO) => void;
}

const SearchKakaoMap = ({
	setPlace
}: SearchKakaoMapProps) => {
	const [keyword, setKeyword] = useState('');
	const [ps, setPs] = useState<any>(null);
	const [map, setMap] = useState<any>(null);
	const [infowindow, setInfowindow] = useState<any>(null);
	const [placeInfo, setPlaceInfo] = useState<PLACE_DTO[]>([]);
	const [selectedPlace, setSelectedPlace] = useState<PLACE_DTO | null>(null);
	const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지
	const [itemsPerPage] = useState(7);  // 페이지당 항목 수
	const [currentPlaces, setCurrentPlaces] = useState<PLACE_DTO[]>([]);
	const [totalPages, setTotalPages] = useState(0);
	var markers = [];

	useEffect(() => {
		const script = document.createElement("script");
		script.async = true;
		script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&libraries=services&autoload=false`;
		document.head.appendChild(script);
    
		script.addEventListener("load", () => {
			window.kakao.maps.load(() => {
				const container = document.getElementById("map");
				const options = {
					center: new window.kakao.maps.LatLng(37.602537, 126.955337), // 초기 중심 좌표 (위도, 경도)
					level: 3, // 지도 확대 레벨
				};
				const resultMap = new window.kakao.maps.Map(container, options);
				if (resultMap) setMap(resultMap);

				//장소 검색 객체를 생성합니다
				const resultPs = new kakao.maps.services.Places();
				if (resultPs) setPs(resultPs); 

				// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
				const resultInfowindow = new kakao.maps.InfoWindow({zIndex:1});
				if (resultInfowindow) setInfowindow(resultInfowindow);
			});
		});
	}, []);

	// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
	function placesSearchCB(data, status, pagination) {
		if (status === kakao.maps.services.Status.OK) {
			// 정상적으로 검색이 완료됐으면
			// 마커를 표출합니다
			displayPlaces(data);
			setPlaceInfo(data);
		} else if (status === kakao.maps.services.Status.ZERO_RESULT) {
			alert('검색 결과가 존재하지 않습니다.');
			return;
    
		} else if (status === kakao.maps.services.Status.ERROR) {
			alert('검색 결과 중 오류가 발생했습니다.');
			return;
		}
	}
    
	// 검색 결과 목록과 마커를 표출하는 함수입니다
	function displayPlaces(places: any) {
    
		var listEl = document.getElementById('placesList'), 
			bounds = new kakao.maps.LatLngBounds();
        
		// 검색 결과 목록에 추가된 항목들을 제거합니다
		removeAllChildNods(listEl);
    
		// 지도에 표시되고 있는 마커를 제거합니다
		removeMarker();
        
		for (var i=0; i<places.length; i++) {
			// 마커를 생성하고 지도에 표시합니다
			var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
				marker = addMarker(placePosition, i); 
    
			// 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
			// LatLngBounds 객체에 좌표를 추가합니다
			bounds.extend(placePosition);
    
			// 마커와 검색결과 항목에 mouseover 했을때
			// 해당 장소에 인포윈도우에 장소명을 표시합니다
			// mouseout 했을 때는 인포윈도우를 닫습니다
			(function(marker, title) {
				kakao.maps.event.addListener(marker, 'mouseover', function() {
					displayInfowindow(marker, title);
				});
    
				kakao.maps.event.addListener(marker, 'mouseout', function() {
					infowindow.close();
				});
			})(marker, places[i].place_name);
		}
    
		// 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
		map.setBounds(bounds);
	}
    
	// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
	function addMarker(position, idx, title) {
		var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
			imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
			imgOptions =  {
				spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
				spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
				offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
			},
			markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
			marker = new kakao.maps.Marker({
				position: position, // 마커의 위치
				image: markerImage 
			});
    
		marker.setMap(map); // 지도 위에 마커를 표출합니다
		markers.push(marker);  // 배열에 생성된 마커를 추가합니다
    
		return marker;
	}
    
	// 지도 위에 표시되고 있는 마커를 모두 제거합니다
	function removeMarker() {
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
		}   
		markers = [];
	}
    
	// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
	// 인포윈도우에 장소명을 표시합니다
	function displayInfowindow(marker, title) {
		var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';
    
		infowindow.setContent(content);
		infowindow.open(map, marker);
	}
    
	// 검색결과 목록의 자식 Element를 제거하는 함수입니다
	function removeAllChildNods(el) {   
		while (el.hasChildNodes()) {
			el.removeChild (el.lastChild);
		}
	}

	
	// 키워드 검색을 요청하는 함수입니다
	function searchPlaces() {
		if (!keyword.replace(/^\s+|\s+$/g, '')) {
			alert('키워드를 입력해주세요!');
			return false;
		}

		// 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
		ps && ps.keywordSearch(keyword, placesSearchCB); 
	}

	const handleSubmit = () => {
		searchPlaces();
		setCurrentPage(1);
		return false;
	};

	const handleCheckboxChange = (place: PLACE_DTO) => {
		setSelectedPlace(prev => prev?.place_url === place.place_url ? null : place);
	};

	useEffect(() => {
		selectedPlace && setPlace(selectedPlace);
	}, [selectedPlace, setPlace]);

	
	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	useEffect(() => {
		console.log(1);
		const indexOfLastPlace = currentPage * itemsPerPage;
		const indexOfFirstPlace = indexOfLastPlace - itemsPerPage;
		const currentData = placeInfo.slice(indexOfFirstPlace, indexOfLastPlace);
		setCurrentPlaces(currentData);
			
		const totalPage = Math.ceil(placeInfo.length / itemsPerPage);
		setTotalPages(totalPage);
	}, [placeInfo, currentPage]);

	return (
		<>
			<Map id='map' center={{ lat: 33.450701,
				lng: 126.570667 }} style={{ width: '100%',
				height: '100%' }}>
			</Map>

			<div id="menu_wrap" className='bg-white'>
				<div className='flex flex-row p-3'>
					<input placeholder='검색 키워드를 입력해주세요.' className='focus:outline-none flex-1 bg-transparent' 
						type="text" value={keyword} onChange={e => setKeyword(e.target.value)} id="keyword" size={15} />
					<button onClick={handleSubmit} className='font-light hover:text-cherry-pink hover:font-bold ml-auto'>검색하기</button> 
				</div>
				<hr/>
				<ul id="placesList">
					{currentPlaces?.map((item, index) => (
						<div key={index} className='flex flex-row gap-5 p-3'>
							<input type='checkbox' 
								checked={selectedPlace?.id === item.id}
								onChange={() => handleCheckboxChange(item)}
							/>
							<div className='flex flex-col ' >
								<p className='text-sm font-bold'>{item.place_name}</p>
								<p className='text-sm text-gray-500'>{item.address_name}</p>
								<Link href={item.place_url} target="_blank">
									<p className='text-xs text-blue-800 underline italic'>{item.place_url}</p>
								</Link>
							</div>
						</div>
					))}
				</ul>
				<div id="pagination" className='flex justify-center mt-4'>
					{Array.from({ length: totalPages }, (_, index) => (
						<button
							key={index}
							onClick={() => handlePageChange(index + 1)}
							className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-cherry-pink text-white' : 'bg-gray-200'}`}
						>
							{index + 1}
						</button>
					))}
				</div>
			</div>
		</>
	);
};

export default SearchKakaoMap;