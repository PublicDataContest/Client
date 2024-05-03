import Image from "next/image";

export default function ReviewItem({ item }) {
  return (
    <div className="flex flex-col gap-[8px] text-[1.4rem]">
      <span className="font-m text-[#9DA0A8]">
        {item.relativeTimeDescription}
      </span>
      <span className="font-b text-[#3B3F4A]">{item.authorName}</span>
      <div className="flex gap-[6px] items-center mb-[2px]">
        <div className="flex gap-[4px] items-center">
          {Array.from({ length: Math.round(item.rating) }).map((_, i) => (
            <Image
              key={`${i}-review`}
              alt=""
              src={require("@images/star_review-orange.svg")}
              width={22}
              height={21}
            />
          ))}
          {Array.from({ length: 5 - Math.round(item.rating) }).map((_, i) => (
            <Image
              key={`${5 - i}-review`}
              alt=""
              src={require("@images/star_review-gray.svg")}
              width={22}
              height={21}
            />
          ))}
        </div>
        <span className="text-[#FF823C] font-b">{item.rating}</span>
      </div>
      {item.photoUrl && (
        <Image
          alt=""
          src={item.photoUrl}
          width={343}
          height={155}
          priority
          className="h-[155px] mb-[8px] rounded-[8px] object-cover"
        />
      )}
      <p className="text-[#3B3F4A]">{item.text}</p>
    </div>
  );
}
