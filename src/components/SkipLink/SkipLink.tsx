import style from "./SkipLink.module.css";

export default function SkipLink() {
    return (
        <a
            id="skip-link"
            tabIndex={0}
            href="#main"
            className={style["skip-link"]}
        >
            Skip to main content
        </a>
    );
}
