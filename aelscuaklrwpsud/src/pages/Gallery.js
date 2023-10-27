import React, { Fragment, useEffect, useState} from 'react';
import GalleryCard from "../components/GalleryCard";
import Overlay from "../components/Overlay";
import ErrorMessage from "../components/ErrorMessage";
import LoadingText from "../components/LoadingText";
import Header from "../components/Header";
import Pagination from "../components/Pagination";

export default function Gallery() {

    const [gallery, setGallery] = useState ({
        paintings: [],
        error: false,
        loaded: false
    })
    const [currentPage, setCurrentPage] = useState(1);
    const [paintingsPerPage] = useState(12);

    useEffect(()  => {
        async function getGallery() {
            try {
                const response = await fetch(
                    "https://devweb2023.cis.strath.ac.uk/~xqb21129/aelscuaklrwpsud/server/get-all-paintings.php"
                )
                const paintingJSON = await response.json();

                setGallery(
                    {
                        ...gallery,
                        paintings: (paintingJSON),
                        loaded: true
                    }
                );
            } catch (err) {
                setGallery(
                    {
                        ...gallery,
                        error: true
                    }
                )
            }
        }
        getGallery();
    });

    const lastPaintingIndex = currentPage * paintingsPerPage;
    const firstPaintingIndex = lastPaintingIndex - paintingsPerPage;
    const noPages = Math.ceil(gallery.paintings.length / paintingsPerPage);

    function renderPaintings() {
        const currentPaintings = gallery.paintings.slice(firstPaintingIndex, lastPaintingIndex);
        return currentPaintings.map(p =>
            <Fragment>
                <GalleryCard
                    paintID={p.paintingID}
                    paintName={p.name}
                    paintComplete={p.completed}
                    paintWidth={p.width}
                    paintHeight={p.height}
                    paintPrice={p.pricetag}
                    paintDesc={p.description}
                    paintImg={p.image}
                />
            </Fragment>
        );
    }

    if (gallery.error) {
        return (
            <Overlay content={
            <ErrorMessage message={"Connection to the gallery database failed."} />
            }/>
        );
    }
    if (gallery.loaded) {
        if (gallery.paintings.length > 0) {
            return (
                <Fragment>
                    <Header />
                    <div className="grid grid-cols-1 lg:grid-cols-3 w-screen
                        animate-fade-up animate-delay-300 animate-duration-1000 animate-once ">
                        {renderPaintings()}
                    </div>
                    <Pagination
                        noPages={noPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />

                </Fragment>
            );
        } else {
            return (
                <Overlay content={
                    <ErrorMessage message={"No paintings in the gallery! Try again later"} />
                }/>
            );
        }

    }
    else {
        return (
            <Overlay content={
                <LoadingText loadMsg="LOADING..." />
            } />
        );
    }
}