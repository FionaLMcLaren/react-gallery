import {Icon} from "@iconify/react";
import React, {useEffect, useState} from "react";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";
import LoadingText from "../LoadingText";
import CartRemove from "../CartRemove";
import {Link} from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
export default function OrderCarousel({cartPage}) {
    const orderedPaintID = JSON.parse(sessionStorage.getItem('cart'));
    const [orderPainting, setOrderPainting] = useState({
            paintings: [],
            loaded: false,
            error: false
        }
    )

    useEffect(()  => {
        async function fetchPaintings() {
            try {
                const response = await axios({
                    method: "post",
                    url: "https://devweb2023.cis.strath.ac.uk/~xqb21129/aelscuaklrwpsud/server/get-paintings-by-id.php",
                    headers: {"content-type": "application/json"},
                    data: orderedPaintID
                })
                const paintingJSON = response.data;

                setOrderPainting({
                    ...orderPainting,
                    paintings: (paintingJSON),
                    loaded: true
                });

            } catch (err) {
                setOrderPainting({
                    ...orderPainting,
                    error: true
                });
            }
        }
        fetchPaintings()
    }, []);

    function CarouselImage(props) {
        return (
            <img
                src={`data:image/jpeg;base64,${props.paintImage}`}
                className= "object-scale-down h-72"
                alt={props.paintDesc}
            />
        ) }
    function CarouselDetail(props) {
        return (
            <div className="w-80 mx-auto px-12 py-3 scale-90 -translate-y-12
            bg-stone-50
            border-double border-4 border-stone-800
            flex flex-col">
                    <p>{props.paintName}</p>
                    <p>{props.paintComplete}</p>
                    <p>{props.paintWidth}mm x {props.paintHeight}mm</p>
                    <p>£{props.paintPrice}</p>
                    <p>{props.paintDesc}</p>
                    <div>
                        {cartPage ?
                            (<CartRemove
                            paintID={props.paintID}
                            cart={orderPainting}
                            setCart={setOrderPainting}
                        />) : "" }
                    </div>
            </div>
        );
    }
    function CarouselNavLeft(props){
        return (
            <button className="font-display tracking-wide text-right
                bg-stone-200
                px-1 absolute bottom-1/2 right-1 z-10 inline-flex gap-1
                form-btn scale-110
                hover:tracking-widest transition-all duration-500"
            onClick={props.clickAction}>
                <Icon icon="guidance:left-arrow" /> Next
            </button>
        )
    }
    function CarouselNavRight(props){
        return (
            <button className="font-display tracking-wide text-right
                bg-stone-200
                px-1 absolute bottom-1/2 left-1 z-10 inline-flex gap-1
                form-btn scale-110
                hover:tracking-widest transition-all duration-500"
            onClick={props.clickAction}>
                <Icon icon="guidance:right-arrow" /> Back
            </button>
        )
    }

        if (orderPainting.loaded) {
            if (orderPainting.paintings.length <= 0) {
                return (
                    <div className="flex justify-center items-center mt-16">
                        <ErrorMessage message=
                                          { cartPage? "No paintings found that match the IDs in your cart"
                                            : "Nothing left in your cart!"
                                            }/>
                    </div>
                )
            } else {
                return (
                    <div className="flex flex-col items-center">
                        <Carousel
                            className="h-100 w-96"
                            renderArrowPrev={(clickHandler, hasNext) =>
                                hasNext && (<CarouselNavRight clickAction={clickHandler}/>)}
                            renderArrowNext={(clickHandler, hasPrev) =>
                                hasPrev && (<CarouselNavLeft clickAction={clickHandler}/>)}
                            showIndicators={false}
                            showStatus={false}
                            showThumbs={false}
                        >
                            {orderPainting.paintings.map(p => {return(
                                    <div key={p.paintingID}>
                                        <CarouselImage paintImage={p.image} paintDesc={p.description}/>
                                        <CarouselDetail
                                            paintID={p.paintingID}
                                            paintName={p.name}
                                            paintComplete={p.completed}
                                            paintWidth={p.width}
                                            paintHeight={p.height}
                                            paintPrice={p.pricetag}
                                            paintDesc={p.description}
                                        />
                                    </div>
                                )}
                            )}
                        </Carousel>
                        {cartPage ?
                            (<Link to="/order"
                                   className="font-display tracking-wide
                                                             form-btn bg-stone-200
                                                             p-2 scale-125 -translate-y-8"
                            >place order</Link>)
                            :
                            "" }
                    </div>
                )
            }
        } else {
            if (cartPage) {
                return (
                    <div className="flex items-center opacity-75 scale-90 mb-10">
                        <LoadingText loadMsg="LOADING YOUR CART..."/>
                    </div>
                )
            } else {
                return (
                    <div className="flex items-center opacity-75 scale-90">
                        <LoadingText loadMsg="MOUNTING YOUR ORDER..."/>
                    </div>
                )
            }
        }
}