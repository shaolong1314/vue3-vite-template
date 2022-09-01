const mime_list = [
  { str: "3gp", reg: /(\.3gp)$/, mime: "video/3gpp" },
  {
    str: "apk",
    reg: /(\.apk)$/,
    mime: "application/vnd.android.package-archive"
  },
  { str: "asf", reg: /(\.asf)$/, mime: "video/x-ms-asf" },
  { str: "avi", reg: /(\.avi)$/, mime: "video/x-msvideo" },
  { str: "bin", reg: /(\.bin)$/, mime: "application/octet-stream" },
  { str: "bmp", reg: /(\.bmp)$/, mime: "image/bmp" },
  { str: "c", reg: /(\.c)$/, mime: "text/plain" },
  { str: "class", reg: /(\.class)$/, mime: "application/octet-stream" },
  { str: "conf", reg: /(\.conf)$/, mime: "text/plain" },
  { str: "cpp", reg: /(\.cpp)$/, mime: "text/plain" },
  { str: "doc", reg: /(\.doc)$/, mime: "application/msword" },
  {
    str: "docx",
    reg: /(\.docx)$/,
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  },
  { str: "xls", reg: /(\.xls)$/, mime: "application/vnd.ms-excel" },
  {
    str: "xlsx",
    reg: /(\.xlsx)$/,
    mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  },
  { str: "exe", reg: /(\.exe)$/, mime: "application/octet-stream" },
  { str: "gif", reg: /(\.gif)$/, mime: "image/gif" },
  { str: "gtar", reg: /(\.gtar)$/, mime: "application/x-gtar" },
  { str: "gz", reg: /(\.gz)$/, mime: "application/x-gzip" },
  { str: "h", reg: /(\.h)$/, mime: "text/plain" },
  { str: "htm", reg: /(\.htm)$/, mime: "text/html" },
  { str: "html", reg: /(\.html)$/, mime: "text/html" },
  { str: "jar", reg: /(\.jar)$/, mime: "application/java-archive" },
  { str: "java", reg: /(\.java)$/, mime: "text/plain" },
  { str: "jpeg", reg: /(\.jpeg)$/, mime: "image/jpeg" },
  { str: "jpg", reg: /(\.jpg)$/, mime: "image/jpeg" },
  { str: "js", reg: /(\.js)$/, mime: "application/x-javascript" },
  { str: "log", reg: /(\.log)$/, mime: "text/plain" },
  { str: "m3u", reg: /(\.m3u)$/, mime: "audio/x-mpegurl" },
  { str: "m4a", reg: /(\.m4a)$/, mime: "audio/mp4a-latm" },
  { str: "m4b", reg: /(\.m4b)$/, mime: "audio/mp4a-latm" },
  { str: "m4p", reg: /(\.m4p)$/, mime: "audio/mp4a-latm" },
  { str: "m4u", reg: /(\.m4u)$/, mime: "video/vnd.mpegurl" },
  { str: "m4v", reg: /(\.m4v)$/, mime: "video/x-m4v" },
  { str: "mov", reg: /(\.mov)$/, mime: "video/quicktime" },
  { str: "mp2", reg: /(\.mp2)$/, mime: "audio/x-mpeg" },
  { str: "mp3", reg: /(\.mp3)$/, mime: "audio/x-mpeg" },
  { str: "mp4", reg: /(\.mp4)$/, mime: "video/mp4" },
  { str: "mpc", reg: /(\.mpc)$/, mime: "application/vnd.mpohun.certificate" },
  { str: "mpe", reg: /(\.mpe)$/, mime: "video/mpeg" },
  { str: "mpeg", reg: /(\.mpeg)$/, mime: "video/mpeg" },
  { str: "mpg", reg: /(\.mpg)$/, mime: "video/mpeg" },
  { str: "mpg4", reg: /(\.mpg4)$/, mime: "video/mp4" },
  { str: "mpga", reg: /(\.mpga)$/, mime: "audio/mpeg" },
  { str: "msg", reg: /(\.msg)$/, mime: "application/vnd.ms-outlook" },
  { str: "ogg", reg: /(\.ogg)$/, mime: "audio/ogg" },
  { str: "pdf", reg: /(\.pdf)$/, mime: "application/pdf" },
  { str: "png", reg: /(\.png)$/, mime: "image/png" },
  { str: "pps", reg: /(\.pps)$/, mime: "application/vnd.ms-powerpoint" },
  { str: "ppt", reg: /(\.ppt)$/, mime: "application/vnd.ms-powerpoint" },
  {
    str: "pptx",
    reg: /(\.pptx)$/,
    mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  },
  { str: "prop", reg: /(\.prop)$/, mime: "text/plain" },
  { str: "rc", reg: /(\.rc)$/, mime: "text/plain" },
  { str: "rmvb", reg: /(\.rmvb)$/, mime: "audio/x-pn-realaudio" },
  { str: "rtf", reg: /(\.rtf)$/, mime: "application/rtf" },
  { str: "sh", reg: /(\.sh)$/, mime: "text/plain" },
  { str: "tar", reg: /(\.tar)$/, mime: "application/x-tar" },
  { str: "tgz", reg: /(\.tgz)$/, mime: "application/x-compressed" },
  { str: "txt", reg: /(\.txt)$/, mime: "text/plain" },
  { str: "wav", reg: /(\.wav)$/, mime: "audio/x-wav" },
  { str: "wma", reg: /(\.wma)$/, mime: "audio/x-ms-wma" },
  { str: "wmv", reg: /(\.wmv)$/, mime: "audio/x-ms-wmv" },
  { str: "wps", reg: /(\.wps)$/, mime: "application/vnd.ms-works" },
  { str: "xml", reg: /(\.xml)$/, mime: "text/plain" },
  { str: "z", reg: /(\.z)$/, mime: "application/x-compress" },
  { str: "zip", reg: /(\.zip)$/, mime: "application/x-zip-compressed" },
  { str: "", reg: / /, mime: "*/*" }
];
// blob转file
export const blobToFile = (blob, fileName) => {
  return new window.File([blob], fileName, {
    type: blob.type
  });
};
export const dataURLtoFile = (dataurl, filename) => {
  // 将base64转换为文件
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename + "." + mime.split("/")[1], { type: mime });
};

export const fileToBase64 = function (file, callback) {
  const r = new FileReader();
  let base64 = "";
  // 转成base64
  r.onload = function () {
    base64 = r.result;
    callback(base64);
  };
  r.readAsDataURL(file); // 转成Base64格式
};

export const blobToDataURL = function (blob, callback) {
  const a = new FileReader();
  a.onload = function (e) {
    callback(e.target.result);
  };
  a.readAsDataURL(blob);
};
export const dataURLtoBlob = function (dataurl) {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

export const getBase64Image = (img) => {
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);
  const ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
  const dataURL = canvas.toDataURL("image/" + ext);
  return {
    dataURL: dataURL,
    type: "image/" + ext
  };
};

export const absoluteUrlToBase64 = (fileUrl) => {
  return new Promise((res, rej) => {
    const image = new Image();
    image.crossOrigin = "";
    image.src = fileUrl;
    image.onload = () => {
      const base64 = getBase64Image(image);
      res(base64);
    };
  }).then();
};

export const downloadFunc = (url, filename = "") => {
  function isIE() {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
      return true;
    } else {
      return false;
    }
  }
  return new Promise((res, rej) => {
    if (isIE()) {
      // IE
      window.open(url, "_blank");
      res();
    } else {
      if ("download" in document.createElement("a")) {
        const elink = document.createElement("a");
        elink.download = filename;
        elink.style.display = "none";
        elink.href = url;
        elink.target = "_blank";
        console.log(elink);
        document.body.appendChild(elink);
        elink.click();
        document.body.removeChild(elink);
      } else {
        navigator.msSaveBlob(blob, filename);
      }
      res();
    }
  })
    .then()
    .catch((e) => {
      console.log("下载失败=> ", e);
    });
};
/**
 * 获取文件mime
 */
export const getMimeType = (url) => {
  for (let i = 0; i < mime_list.length; i++) {
    if (mime_list[i].reg.test(url)) {
      return mime_list[i];
    }
  }
};
/**
 * 获取文件后缀名
 */
export const getFileSuffix = (file) => {
  for (let i = 0; i < mime_list.length; i++) {
    if (mime_list[i].mime == file.type) {
      return mime_list[i].str;
    }
  }
};

export const fileToBlob = (file, callback) => {
  const type = file.type;
  const reader = new FileReader();
  const rs = reader.readAsArrayBuffer(file);
  let blob = null;
  reader.onload = (event) => {
    if (typeof event.target.result === "object") {
      blob = new Blob([event.target.result], { type });
    } else {
      blob = event.target.result;
    }
    callback && callback(blob);
  };
};

/**
 *
 * @param {*} file 视频文件
 * @return 视频详细信息
 */
export const getVideoInfo = (file) => {
  return new Promise((res, rej) => {
    fileToBlob(file, (blob) => {
      const videoUrl = URL.createObjectURL(blob);
      const video = document.createElement("video");
      video.src = videoUrl;
      video.id = file.uid;
      video.style.display = "none";
      video.oncanplay = () => {
        const videoInfo = video;
        document.getElementById(file.uid).remove();
        res(videoInfo);
      };
      document.body.appendChild(video);
    });
  });
};
