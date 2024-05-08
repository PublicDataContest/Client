export const getPos = () => {
  let [x, y] = [0, 0];
  if (navigator.geolocation) {
    const success = async (position) => {
      x = position.coords.latitude; // 위도
      y = position.coords.longitude; // 경도
    };
    const error = () => {
      console.log("error in navigator.geolocation.getCurrentPosition");
    };
    navigator.geolocation.getCurrentPosition(success, error);
  }
  return { x, y };
};
