'use client';

import React, { useEffect } from 'react';
import { Map } from 'react-kakao-maps-sdk';

interface KakaoMap {
    lat: number;
    lng: number;
}   

const KakaoMap = ({lat = 37.602537, lng = 126.955337}: KakaoMap) => {
	useEffect(() => {
		const script = document.createElement("script");
		script.async = true;
		script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&autoload=false`;
		document.head.appendChild(script);
    
		script.addEventListener("load", () => {
			window.kakao.maps.load(() => {
				const container = document.getElementById("map");
				const options = {
					center: new window.kakao.maps.LatLng(lat, lng), // 초기 중심 좌표 (위도, 경도)
					level: 3, // 지도 확대 레벨
				};
				var map = new window.kakao.maps.Map(container, options);
				var markerPosition  = new kakao.maps.LatLng(lat, lng); 

				// 마커를 생성합니다
				var marker = new kakao.maps.Marker({
					position: markerPosition
				});

				// 마커가 지도 위에 표시되도록 설정합니다
				marker.setMap(map);
			});
		});
	}, []);

	return (
		<>
			<Map id='map' center={{ lat: 33.450701,
				lng: 126.570667 }} style={{ width: '100%',
				height: '100%' }}>
			</Map>
		</>
	);
};
export default KakaoMap;