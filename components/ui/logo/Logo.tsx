import style from "./logo.module.scss";

export default function Logo() {
  return (
    <div className={style.head}>
      <img src="/imgs/pencil-second.svg" alt="아이콘" />
      <h1 className={style.headTitle}>weekly diary</h1>
    </div>
  );
}
