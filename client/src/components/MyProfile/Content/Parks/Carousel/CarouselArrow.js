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

    // can't target anchor tags or pseudoselectors with
    // inline styling, will need to use something 
    // like radium to handle removing pseudoselector upon arrowLogic change. 

    const aCS = arrowLogic ? css`
        &:hover{
            cursor: pointer;
            background-color:#D6D6D6 !important;
        }
    ` :
    null

        // need to assign fade in and fade out transitions to icons

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