import Carousel from "@/components/Carousel";

const slides = [
    { url: "https://picsum.photos/1400/780?random=1" },
    { url: "https://picsum.photos/1400/780?random=2" },
    { url: "https://picsum.photos/1400/780?random=3" },
    { url: "https://picsum.photos/1400/780?random=4" },
    { url: "https://picsum.photos/1400/780?random=5" },
];

export default function Home() {
    return <Carousel slides={slides} slideDelay={2} />;
}
