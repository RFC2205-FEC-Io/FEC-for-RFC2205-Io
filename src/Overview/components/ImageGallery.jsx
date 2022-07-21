import React, {useState, useEffect, useRef} from 'react';
import expand_icon from '../../../dist/expand_icon.png';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import Overlay from 'react-bootstrap/Overlay';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';
const ImageGallery = ({images, clickedThumb, thumbnailClicked, galleryIMG, toggleImages, setGallery}) => {
  const mainImage = 'Smiley Shades.png';


    // ------------Sets one of the gallery images the main image in the gallery------------//
  const [listImg, addImage] = useState('');
  const [galleryIMGClicked, clicked] = useState(false);
  const setBackgroundImage = (event, imageURL) => {
    event.preventDefault();
    addImage(current => imageURL);
    clicked( current => true);
    setMainCarouselIndex(Number(event.target.className[event.target.className.length -1]));

  }

  // ------------Sets the main image in the gallery------------
  const setMainImg = () => {
    if (thumbnailClicked) {
      return { backgroundImage: `url( ${clickedThumb})`};
    }  else if (galleryIMGClicked) {
      return { backgroundImage: `url( ${listImg})`};
    } else if (!thumbnailClicked && !galleryIMGClicked){
      return { backgroundImage: `url( ${mainImage})`};
    }
  }

// ------------Creates the expanded view for the main image------------
  const [modal, setModal] = useState(false);
  var countShow = 0;
  var countClose = 0;
  const showModal= () => {setModal(true); console.log('<- Modal opened!', 'countShow:', countShow); countShow ++;};
  const closeModal = () => {setModal(false); console.log('<- Modal closed!','countClose:', countClose); countClose ++};
  const expandView = (listImg) => {
    if (!modal) {
      return;
      } else {
      return (
        <Modal show={modal} animation={false}>
          <Modal.Body onClick={closeModal}>
          <img src={listImg}></img>
          </Modal.Body>
        </Modal>
      );
    }
  }
 // ------------Highlight the gallery thumbnail when selected------------
  const highlightGalleryThumbnail = (event) => {
    console.log('highlight event:', event)
    if (galleryIMGClicked) {
      return {opacity: 1};
      } else {
      return {};
    }
  }
 // ------------Creates the carousel for the gallery thumbnails------------
  const imageArr = [];

  const createGallery = () => {
    var i = -1;
    if (images.length <= 7 && setGallery) {
      return images.map((image) => {
        i++;
        return (
          <div>
            <img
            id ='gallery-thumbnail'src={image.thumbnail_url}
            onClick={()=> {setBackgroundImage(event, image.url); toggleImages()}}
            key={i}
            className={`galleryImg ${i}`}
            />
          </div>
        );
      });
    } else if (images.length > 7 && setGallery) {
      var divideIndex = images.length - 7
      var imgArr1 = images.slice(0, 7);
      var imgArr2 = images.slice(-divideIndex, images.length);
      return (
      <div id='gallery-carousel' style={{height: '50px', width: '400px', /*border: 'solid 1px yellow'*/}}>
      <Carousel interval={null}>
        <Carousel.Item>
          {imgArr1.map((image) => {
            i++;
            return (
              <img
                id ='gallery-thumbnail'src={image.thumbnail_url}
                onClick={()=> {setBackgroundImage(event, image.url); toggleImages()}}
                key={i}
                className={`galleryImg ${i}`}
              />
              );
            })}
        </Carousel.Item>
        <Carousel.Item>
          {imgArr2.map((image) => {
            i++;
            return (
              <img
                id ='gallery-thumbnail'src={image.thumbnail_url}
                onClick={()=> {setBackgroundImage(event, image.url); toggleImages()}}
                key={i}
                className={`galleryImg ${i}`}
              />
            );
          })}
        </Carousel.Item>
      </Carousel>
      </div>
      );
    } else {
      return;
    }
  }

  // ------------Keep track of carousel state------------
    const [carouselIndex, setMainCarouselIndex] = useState(0);
    const updateCarouselState = (selectedIndex, e) => {
      setMainCarouselIndex(selectedIndex);
    }

// ------------Creates the main image Carousel------------
  const mainImageCarousel = () => {
    return (
    <div id='carousel-main' style={{height: '400px', width: '600px', /*border: 'solid 1px red'*/}}>
    <Carousel interval={null} ref={target} activeIndex={carouselIndex} onSelect={updateCarouselState}>
    {images.map((image) => {
      return (
        <Carousel.Item>
            {/* <img
            id ='carousel-main-img' // Lawrence, images don't resize their dimensions with the carousel, they both need separate CSS
            src={image.thumbnail_url}
            onClick={()=> {setBackgroundImage(event, image.url); toggleImages()}}
            onClick={showModal}
            />
          <div>
          {expandView(listImg)}
        </div> */}
          <div
            id ='carousel-main-img' // Lawrence, images don't resize their dimensions with the carousel, they both need separate CSS
            src={image.thumbnail_url}
            onClick={()=> {setBackgroundImage(event, image.url); toggleImages()}}
            // onClick={showModal}
            style={{backgroundImage: `url(${image.thumbnail_url})`, backgroundSize: 'cover'}}
            >
            {createGallery()}
            </div>
          <div>
          {expandView(listImg)}
        </div>
        </Carousel.Item>
        );
      })}
    </Carousel>
    </div>
    )
  };



    const [show, setShow] = useState(false);
    const target = useRef(null);
  return (
    <div id='image-gallery'>
      {/* <div id='main-img'  style={setMainImg()} >
        {createGallery()}
        <div id='view'>
          <img id='expander'src={expand_icon} onClick={showModal}}/>
        </div>
        <div>
          {expandView(listImg)}
        </div>
      </div> */}
    {/* {createGallery()} */}
    {mainImageCarousel()}
  </div>
  );
}

export default ImageGallery;

