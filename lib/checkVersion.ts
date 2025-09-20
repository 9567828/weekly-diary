export const checkVersion = async () => {
  try {
    const res = await fetch("/version.json?cache=" + Date.now());

    if (!res.ok) {
      console.warn("version.json 없음, dev 환경일 수 있음");
      return false;
    }

    const contentType = res.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      console.warn("JSON이 아닌 응답을 받음 (dev 환경)");
      return false;
    }

    const data = await res.json();
    const latest = data.version;
    const current = localStorage.getItem("app-version");

    if (current && current !== latest) {
      localStorage.setItem("app-version", latest);
      window.location.reload();
      return true;
    } else {
      localStorage.setItem("app-version", latest);
      return true;
    }
  } catch (err) {
    console.error("버전체크실패: ", err);
  } finally {
    return false;
  }
};
