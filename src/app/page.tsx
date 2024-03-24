import PhotoCarousel from "@/components/PhotoCarousel/PhotoCarousel";

const slides = [
    {
        url: "https://picsum.photos/1400/780?random=1",
        caption: "The first slide",
    },
    {
        url: "https://picsum.photos/1400/780?random=2",
        caption: "The second slide",
    },
    {
        url: "https://picsum.photos/1400/780?random=3",
        caption: "The third slide",
    },
    {
        url: "https://picsum.photos/1400/780?random=4",
        caption: "The fourth slide",
    },
    {
        url: "https://picsum.photos/1400/780?random=5",
        caption: "The fifth slide",
    },
    {
        url: "https://picsum.photos/1400/780?random=6",
        caption: "The sixth slide",
    },
];

export default function Home() {
    return (
        <>
            <PhotoCarousel slides={slides} slideDelay={10} />
        </>
    );
}
