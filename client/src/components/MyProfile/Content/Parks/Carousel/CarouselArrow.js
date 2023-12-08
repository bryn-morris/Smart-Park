import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

function CarouselArrow({
    arrowDirection,
    carArrowFunction,
    arrowLogic
}) {

    // can't target anchor tags or pseudoselectors with
    // inline styling, will need to use something 
    // like radium to handle removing pseudoselector upon arrowLogic change. 

    return(
        <div 
            className={`${arrowDirection}ArrowContainer`}
            onClick={
                arrowLogic === true ?
                carArrowFunction: null
            }
        >
            {arrowDirection === "right" ? 
            <ArrowRightIcon 
                className='icon'
            /> : 
            <ArrowLeftIcon 
                className='icon'
            />}
        </div>
    )
}

export default CarouselArrow