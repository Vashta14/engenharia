import localforage from "localforage";
import { useState, useEffect } from "react";

export function Avatar(props: AvatarProps) {
  const { alt, src } = props;
  const [fileUrl, setFileUrl] = useState<string>("");
  useEffect(() => {
    async function getFile() {
      const file = await localforage.getItem(src);
      const url = URL.createObjectURL(file as File);
      setFileUrl(url);
    }
    getFile();
  }, [src]);

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-white"
      style={{
        width: "40px",
        height: "40px",
        objectFit: "scale-down",
        borderRadius: "5px",
      }}
    >
      <img
        src={fileUrl}
        style={{
          width: "40px",
          height: "100%",
          objectFit: "scale-down",
          borderRadius: "5px",
        }}
        alt={alt}
      />
    </div>
  );
}
