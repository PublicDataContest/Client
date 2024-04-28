import axiosInstance from "@api/axiosInstance";
import useUserInfo from "@hooks/useUserInfo";
import { useEffect, useRef, useState } from "react";

export default function KakaoMap({
  selectedMarker,
  setSelectedMarker,
  content,
  setContent,
}) {
  const selectedCustomOverlay = useRef(null);
  const mapRef = useRef(null);
  const { userInfo } = useUserInfo();
  const [isLoadKakao, setIsLoadKakao] = useState(false);

  const getGu = async (x, y) => {
    const res = await fetch(
      `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${y}&y=${x}`,
      {
        headers: {
          authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
        },
      }
    );
    const json = await res.json();
    const { region_2depth_name } = json.documents[0].address;
    const gu = region_2depth_name.split(" ")[1];
    console.log(gu);
    return gu;
  };

  const getContent = async (gu) => {
    try {
      const res = await axiosInstance.get(
        `/api/api/map/${
          userInfo.userId ?? localStorage.getItem("userId")
        }/${gu}`
      );
      console.log(res);
      const {
        content,
        pageable,
        last,
        totalElements,
        totalPage,
        size,
        number,
        sort,
        first,
        numberOfElements,
        empty,
      } = res.data.data;
      setContent(content);
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  const setDefaultMap = async () => {
    const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      center: new window.kakao.maps.LatLng(
        37.562338155889385,
        126.97420654822417
      ), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };
    const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    mapRef.current = map;

    await getContent("중구");
  };

  const setMap = async () => {
    const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스

    if (navigator.geolocation) {
      const success = async (position) => {
        const x = position.coords.latitude; // 위도
        const y = position.coords.longitude; // 경도

        const options = {
          center: new window.kakao.maps.LatLng(x, y), //지도의 중심좌표.
          level: 3, //지도의 레벨(확대, 축소 정도)
        };
        const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
        mapRef.current = map;

        // 구 위치 구하기
        const gu = await getGu(x, y);
        await getContent(gu);
      };
      const error = () => {
        setDefaultMap();
      };
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      setDefaultMap();
    }
  };

  const setMarker = () => {
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
    for (let i = 0; i < content.length; i++) {
      const pos = content[i];
      console.log("pos", pos);
      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(pos.y, pos.x), // 마커를 표시할 위치
        image: markerImage, // 마커이미지 설정
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(mapRef.current);

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
            clickable: true, // 컨텐츠 영역을 클릭했을 경우 지도 이벤트를 막아준다.
          });

          // 커스텀 오버레이를 지도에 표시합니다
          customOverlay.setMap(mapRef.current);

          setSelectedMarker(i);
          selectedCustomOverlay.current = customOverlay;
        }
      });

      // 커스텀 오버레이 아닌 영역 클릭 시 커스텀 오버레이 닫기
      kakao.maps.event.addListener(mapRef.current, "click", () => {
        setSelectedMarker(null);
        if (selectedCustomOverlay.current) {
          selectedCustomOverlay.current.setMap(null);
        }
      });
    }
  };

  useEffect(() => {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        setIsLoadKakao(true);
      });
    };
    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);

    return () => kakaoMapScript.removeEventListener("load", onLoadKakaoAPI);
  }, []);

  useEffect(() => {
    if (!isLoadKakao) return;
    setMap();
  }, [isLoadKakao]);

  useEffect(() => {
    if (!isLoadKakao) return;
    setMarker();
  }, [content]);

  return <div id="map" className="w-full h-full" />;
}
