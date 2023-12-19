import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import {css} from "@emotion/react";

// Jsx Pragma needed for emotion css
/** @jsxImportSource @emotion/react */

function CarouselArrow({
    arrowDirection,
    carArrowFunction,
    arrowLogic
}) {

    const aCS = arrowLogic ? 
    css`&:hover{cursor: pointer;` :
    null

    return(
        <div 
            className={`${arrowDirection}ArrowContainer`}
            onClick={
                arrowLogic === true ?
                carArrowFunction: null
            }
            css = {aCS}
        >
            {
                arrowDirection === "right" ? 
                <ArrowRightIcon 
                    className={`icon ${arrowLogic ? '' : 'hidden'}`}
                /> : 
                <ArrowLeftIcon 
                    className={`icon ${arrowLogic ? '' : 'hidden'}`}
                />
            }
        
        </div>
    )
}

export default CarouselArrow