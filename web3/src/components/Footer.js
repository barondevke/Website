import React from 'react'
import { Row, Col, Image } from 'react-bootstrap'

const Footer = () => {
  return (
    <div className='footerDiv'>
        
            
            <div className='footerLink'>Product</div> 
        

            
            
            <div className='footerLink'>Invest</div>
         
            
            <div className='footerLink'>Company</div>   


            
         
        
       <div className='socialIcons'>
       <img className='socialsIcon' src={require('../assets/facebook.png')} />
        <img className='socialsIcon' src={require('../assets/instagram.png')} />
        <img className='socialsIcon' src={require('../assets/mail.png')} />
       </div>
         
        
            <h4 className='copyright'>2023. AdInfinite Limited</h4>
        
            
      
    </div>
  )
}

export default Footer
