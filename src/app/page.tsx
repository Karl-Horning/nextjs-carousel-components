import Carousel from "@/components/Carousel";

const slides = [
    {
        url: "https://picsum.photos/1400/780?random=1",
        title: "Title Number One",
        caption: "The first slide",
        link: "#",
    },
    {
        url: "https://picsum.photos/1400/780?random=2",
        title: "Title Number Two",
        caption: "The second slide",
        link: "#",
    },
    {
        url: "https://picsum.photos/1400/780?random=3",
        title: "Title Number Three",
        caption: "The third slide",
        link: "#",
    },
    {
        url: "https://picsum.photos/1400/780?random=4",
        title: "Title Number Four",
        caption: "The fourth slide",
        link: "#",
    },
    {
        url: "https://picsum.photos/1400/780?random=5",
        title: "Title Number Five",
        caption: "The fifth slide",
        link: "#",
    },
];

export default function Home() {
    return <Carousel slides={slides} slideDelay={2} />;
}
