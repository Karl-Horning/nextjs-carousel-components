import style from "./SkipLink.module.css";

export default function SkipLink() {
    return (
        <a href="#main" className={style["skip-link"]}>
            Skip to content
        </a>
    );
}
