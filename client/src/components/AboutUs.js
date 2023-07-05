import React, {useState} from 'react'

function AboutUs() {
    const [showTreats, setShowTreats] = useState(false);
    const [audio, setAudio] = useState(null);
  
    const handleClick = () => {
      setShowTreats(!showTreats);
      if (!showTreats) {
        const audioObject = new Audio('https://www.myinstants.com/media/sounds/dogs_1.mp3');
        audioObject.play();
        setAudio(audioObject);
      } else if (audio) {
        audio.pause();
      }
    }
  
    return (
      <>
        <div className="about Text">
          <button className='about dog-bone-button'  onClick={handleClick}></button>
          {showTreats && (
            <div>
              {[...Array(10)].map((_, i) => (
                <img key={i} src="https://media.officedepot.com/images/f_auto,q_auto,e_sharpen,h_450/products/660928/660928_p_dogbiscuts_01_010318/660928" alt="treat" width="50" height="50" />
              ))}
            </div>
          )}
          <h1>{showTreats ? 'Woof' : 'Smart Park'}</h1>
                <p>{showTreats ? 'Woof Woof Woof Bark? BARK! BARK WoOf! WooF? Bark Woof Woof Woof Bark? BARK! BARK WoOf! WooF? Bark Woof Woof Woof Bark? BARK! BARK WoOf! WooF? Bark Woof Woof Woof Bark? BARK! BARK WoOf! WooF? Bark Woof Woof Woof Bark? BARK! BARK WoOf! WooF? Bark Woof Woof Woof Bark? BARK! BARK WoOf! WooF? Bark Woof Woof Woof Bark? BARK! BARK WoOf! WooF? Bark Woof Woof Woof Bark? BARK! BARK WoOf! WooF? Bark Woof Woof Woof Bark? BARK! BARK WoOf! WooF? Bark Woof Woof Woof Bark? BARK! BARK WoOf! WooF? Bark Woof Woof Woof Bark? BARK! BARK WoOf! WooF? Bark Woof Woof Woof Bark? BARK! BARK WoOf! WooF? Bark Woof Woof Woof Bark? BARK! BARK WoOf! WooF? Bark Woof Woof Woof Bark? BARK! BARK WoOf! WooF? Bark Woof Woof Woof Bark? BARK! BARK WoOf! WooF? Bark Woof Woof Woof Bark? BARK! BARK WoOf! WooF? Bark Woof Woof Woof Bark? BARK! BARK WoOf! WooF? Bark ' : 'Welcome to the Smart Park Dog Park Application! Our Mission is to enhance the experience of dog owners and their furry friends at dog parks. Our team is dedicated to creating a user-friendly application that makes it easy for dog owners to locate and learn about dog parks in their area. We believe that dogs deserve a safe and enjoyable environment to exercise and play, and we are committed to providing dog owners with the tools they need to find the best dog parks for their furry friends. Our application provides detailed information about each dog park, including park amenities, address, photos and ratings. We also offer a community feature that allows dog owners to connect with each other, share tips and advice, and arrange playdates for their dogs. At Smart Park, we believe that technology can help enhance the bond between dog owners and their pets. Our app is designed to be user-friendly and accessible, making it easy for dog owners to find and navigate their way to the nearest dog park. We are dedicated to providing a seamless experience for our users and welcome any feedback that can help us improve our service. Thank you for choosing Smart Park Dog Park Application, we look forward to helping you and your furry friend discover new and exciting adventures in your local dog parks!'}</p>
            </div><div>
                    <div>
                        <img className='about Img'
                            src='https://fox5sandiego.com/wp-content/uploads/sites/15/2022/07/Carlsbad-dog-park-072822-copy-e1659016132684.jpg'
                            alt='Dog Park' />
                        <div className='about Footer'>
                            <footer>
                                <p>
                                    Email us at:
                                    <a href="mailto:smartparkapp@gmail.com">smartparkapp@gmail.com</a>
                                </p>
                            </footer>
                            <footer>
                                <address>Visit us at: 123 Woofer Lane, Puppy Town USA</address>
                            </footer>
                            <footer>
                                <p>Phone Number: (123)-456-7890</p>
                            </footer>
                        </div>
                    </div>
                </div>
      </>
   )}

export default AboutUs