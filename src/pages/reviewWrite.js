import Image from "next/image";
import { useState } from "react";
import ReviewCalendar from "../components/reviewCalendar";
import axiosInstance from "@api/axiosInstance";
import useUserInfo from "@hooks/useUserInfo";
import getDateString from "@utils/getDateString";
import { useRouter } from "next/router";

export default function ReviewWrite() {
  const router = useRouter();
  const { userInfo } = useUserInfo();
  const [selectedStar, setSelectedStar] = useState(
    Array.from({ length: 5 }, () => false)
  );
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [text, setText] = useState("");
  const [images, setImages] = useState([]); // base64 인코딩된 문자열이 들어감
  const [formImages, setFormImages] = useState([]); // form data에 담아 보낼 이미지 파일 리스트
  const MAX_IMG_CNT = 1;

  const handleSelectStar = (starIdx) => {
    const newArr = JSON.parse(JSON.stringify(selectedStar));
    for (let i = 0; i < 5; i++) {
      if (i <= starIdx) {
        newArr[i] = true;
      } else {
        newArr[i] = false;
      }
    }
    setSelectedStar(newArr);
  };

  const handleSelectImage = (e) => {
    const imageArr = e.target.files; // e.target.files에서 넘어온 이미지들을 배열에 저장
    const maxAddImageCnt = MAX_IMG_CNT - formImages.length; // 새로 추가할 이미지의 최대 업로드 개수

    // 1. 파일 업로드 개수 검증
    if (imageArr.length > maxAddImageCnt) {
      alert("최대 등록 가능한 이미지 개수를 초과했습니다.");
      return;
    }

    // 2. 파일 업로드 시 모든 파일 (*.*) 선택 방지 위해 이미지 type을 한 번 더 검증
    for (let i = 0; i < imageArr.length; i++) {
      if (
        imageArr[i].type !== "image/jpeg" &&
        imageArr[i].type !== "image/jpg" &&
        imageArr[i].type !== "image/png"
      ) {
        alert("JPG 혹은 PNG 확장자의 이미지 파일만 등록 가능합니다.");
        return;
      }
    }

    Array.from(imageArr).forEach((image) => {
      setFormImages((prev) => [...prev, image]);

      // 이미지 파일 Base64 인코딩: 이미지 미리보기 위함
      const reader = new FileReader();

      reader.readAsDataURL(image); // 파일을 읽고, result 속성에 파일을 나타내는 URL을 저장

      reader.onload = () => {
        // 읽기 완료 시(성공만) 트리거 됨
        setImages((prev) => [...prev, reader.result]); // reader.result는 preview Image URL임
      };
    });
  };

  const deleteImage = (e) => {
    // 클릭 안 된 것들로만 배열 만들기
    // 1. 미리보기 이미지
    const newImagesArr = images.filter((_, i) => i !== parseInt(e.target.id));
    setImages(newImagesArr);

    // 2. 실제로 전달할 파일 객체
    const newFormImagesArr = formImages.filter(
      (_, i) => i !== parseInt(e.target.id)
    );
    setFormImages(newFormImagesArr);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // 이미지와 json 데이터를 함께 전달하기 위해 FormData 객체에 담아서 전달
    const formData = new FormData();

    if (formImages.length > 0) {
      // 이미지 파일이 업로드된 경우
      Array.from(formImages).forEach((image) => {
        formData.append("photoFile", image); // 이미지 파일 배열 담기
      });
    } else {
      // 업로드된 이미지 파일이 없는 경우
      formData.append("photoFile", null);
    }

    formData.append("relativeTimeDescription", getDateString(date));
    formData.append("rating", selectedStar.filter((v) => v).length);
    formData.append("text", text);

    try {
      await axiosInstance.post(
        `/api/api/review/normal/${
          userInfo.userId ?? localStorage.getItem("userId")
        }/${router.query.restaurantId}`,
        formData
      );
      alert("리뷰가 등록되었습니다.");
      router.back();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div
      className={`relative h-full ${
        showDate ? "overflow-hidden" : "overflow-y-auto"
      } px-[16px] pb-[18px] bg-[#EFF1F4]`}
    >
      <div className="py-[10px]">
        <Image
          alt="뒤로가기"
          src={require("@images/chevron_left-gray.svg")}
          width={24}
          height={24}
          onClick={() => router.back()}
          className="cursor-pointer"
        />
      </div>

      <form onSubmit={onSubmit}>
        <div className="pt-[8px] flex flex-col gap-[12px]">
          <span className="text-[1.8rem] font-[Pretendard-SemiBold] pb-[4px]">
            {router.query.placeName}
          </span>

          <div className="bg-white h-[44px] rounded-[10px] px-[16px] flex justify-between items-center text-[1.4rem] font-[Pretendard-Medium]">
            <span className="text-[#3B3F4A]">방문 날짜</span>
            <button
              type="button"
              className="flex gap-[4px] items-center"
              onClick={() => setShowDate(true)}
            >
              <Image
                alt="방문 날짜"
                src={require("@images/calendar-gray.svg")}
                width={20}
                height={20}
              />
              <span className="text-[#9DA0A8]">
                {date.getFullYear()}.{date.getMonth() + 1}.{date.getDate()}
              </span>
            </button>
          </div>

          <div className="bg-white h-[85px] rounded-[10px] px-[16px] flex flex-col gap-[8px] justify-center items-center text-[1.4rem] font-[Pretendard-Medium]">
            <span className="text-[#3B3F4A]">방문한 가게는 어떠셨나요?</span>
            <div className="flex gap-[7px] items-center">
              {selectedStar.map((v, i) => (
                <Image
                  key={i}
                  alt="별점"
                  src={
                    v
                      ? require("@images/star_review-fill-orange.svg")
                      : require("@images/star_review-outline-gray.svg")
                  }
                  width={34}
                  height={34}
                  priority
                  onClick={() => handleSelectStar(i)}
                  className="cursor-pointer"
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-[4px]">
            <textarea
              className="bg-white h-[190px] rounded-[10px] py-[12px] px-[14px] placeholder:text-[#9DA0A8]"
              placeholder={`방문한 가게에 대한 리뷰를 남겨 주세요.${"\n"}(최소 10자)`}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            <span className="self-end text-[#5A5E6A] text-[1.2rem]">
              {text.length} <span className="text-[#9DA0A8]">/500</span>
            </span>
          </div>

          <div className="relative bg-white h-[130px] rounded-[10px] py-[10px] px-[16px] font-[Pretendard-Medium] flex flex-col justify-center items-center gap-[6px]">
            <span className="text-[#3B3F4A] text-[1.4rem]">
              이미지를 첨부해 주세요(선택)
            </span>
            <div className="relative overflow-hidden w-[144px] h-[80px] rounded-[8px] bg-[#EFF1F4] flex justify-center items-center">
              {images.length ? (
                images.map((v, i) => (
                  <div key={i}>
                    <Image
                      alt=""
                      src={v}
                      width={45}
                      height={45}
                      className="w-full h-auto object-cover"
                    />
                    <Image
                      alt=""
                      src={require("@images/delete-gray.svg")}
                      width={16}
                      height={16}
                      className="absolute top-[4px] right-[4px] cursor-pointer"
                      id={i}
                      onClick={deleteImage}
                    />
                  </div>
                ))
              ) : (
                <>
                  <input
                    className="hidden"
                    type="file"
                    name="images"
                    id="images"
                    // multiple
                    accept="image/jpg, image/jpeg, image/png"
                    onChange={handleSelectImage}
                  />
                  <label htmlFor="images">
                    <Image
                      alt=""
                      src={require("@images/camera-gray.svg")}
                      width={45}
                      height={45}
                      className="cursor-pointer"
                    />
                  </label>
                </>
              )}
            </div>
            <span className="absolute bottom-[10px] right-[16px] text-[#9DA0A8] text-[1.3rem]">
              {images.length} /{" "}
              <span className="text-[#5A5E6A]">{MAX_IMG_CNT}</span>
            </span>
          </div>
        </div>

        <button
          className="w-full mt-[29px] h-[43px] disabled:bg-[#9DA0A8] bg-brand rounded-[10px]"
          disabled={!selectedStar.filter((v) => v).length || text.length < 10}
        >
          <span className="text-white font-[Pretendard-SemiBold]">
            등록하기
          </span>
        </button>
      </form>

      {showDate && (
        <div className="absolute bottom-0 left-0 z-30 w-full h-full">
          <ReviewCalendar
            date={date}
            setDate={setDate}
            setShowDate={setShowDate}
          />
        </div>
      )}
    </div>
  );
}
