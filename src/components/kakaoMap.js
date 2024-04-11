import { useEffect, useRef } from "react";

export default function KakaoMap({
  selectedMarker,
  setSelectedMarker,
  positions,
}) {
  const selectedCustomOverlay = useRef(null);

  useEffect(() => {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
        const options = {
          //지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
          level: 3, //지도의 레벨(확대, 축소 정도)
        };

        const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

        const imageSrc = "/images/marker-food.svg"; // 마커이미지의 주소입니다
        const imageSize = new kakao.maps.Size(22, 30); // 마커이미지의 크기입니다
        const imageOption = { offset: new kakao.maps.Point(11, 32) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        const markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        // 마커를 생성합니다
        for (let i = 0; i < positions.length; i++) {
          const pos = positions[i];
          // 마커를 생성합니다
          const marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(pos.x, pos.y), // 마커를 표시할 위치
            image: markerImage, // 마커이미지 설정
          });

          // 마커가 지도 위에 표시되도록 설정합니다
          marker.setMap(map);

          // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
          kakao.maps.event.addListener(marker, "click", () => {
            if (i !== selectedMarker) {
              // 커스텀 오버레이를 닫습니다
              if (selectedCustomOverlay.current) {
                selectedCustomOverlay.current.setMap(null);
              }

              // 커스텀 오버레이를 생성합니다
              const customOverlay = new kakao.maps.CustomOverlay({
                position: new kakao.maps.LatLng(pos.x, pos.y),
                content: `<div style="width: 38px; height: 48px; position: relative; bottom: 22px;">
                  <img alt="" src="/images/marker-selected.svg" />
                  <img style="position: absolute; top: 4px; left: 4px; border-radius: 50%; width: 30px; height: 30px;" alt="marker" src="${pos.imgUrl}" />
                </div>`,
              });

              // 커스텀 오버레이를 지도에 표시합니다
              customOverlay.setMap(map);

              setSelectedMarker(i);
              selectedCustomOverlay.current = customOverlay;
            }
          });
        }
      });
    };
    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);

    return () => kakaoMapScript.removeEventListener("load", onLoadKakaoAPI);
  }, []);

  return <div id="map" className="w-full h-full" />;
}
