'use client';

import { useEffect, useRef, useState, MutableRefObject } from "react";

const useIntersectionObserver = (targetRef: MutableRefObject<HTMLElement | null>): boolean => {
	const [isInViewport, setIsInViewport] = useState(false);
	const observer = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		if (!observer.current) {
			const observerCallback: IntersectionObserverCallback = (entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsInViewport(true);
					} else {
						setIsInViewport(false);
					}
				});
			};

			observer.current = new IntersectionObserver(observerCallback, {
				threshold: 0,
			});
		}

		if (targetRef?.current) {
			observer.current.observe(targetRef.current);
		}

		return () => {
			if (observer.current) {
				observer.current.disconnect();
			}
		};
	}, [targetRef]);

	return isInViewport;
};

export default useIntersectionObserver;
