export const getGu = async (x, y) => {
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

  return gu;
};
