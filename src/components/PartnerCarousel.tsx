import React, { useEffect, useState } from 'react';
const partners = [{

  logo: 'https://res.cloudinary.com/dmqjqn6x3/image/upload/v1749333022/photo_2023-06-28_22-10-35_jo7cs7.jpg'
}, {
  logo: 'https://res.cloudinary.com/dmqjqn6x3/image/upload/v1749332830/photo_2023-07-10_19-26-33_mh9kch.jpg'
}, {
  logo: 'https://res.cloudinary.com/dmqjqn6x3/image/upload/v1749332826/photo_2023-07-10_19-26-29_fz1ff0.jpg'
}, {
  logo: 'https://res.cloudinary.com/dmqjqn6x3/image/upload/v1749332765/lifespan_pjmym3.jpg'
}, {
  logo: 'https://res.cloudinary.com/dmqjqn6x3/image/upload/v1749332759/lev0_cglhw5.jpg'
}, {
  logo: 'https://res.cloudinary.com/dmqjqn6x3/image/upload/v1749332744/unnamed-removebg-preview_xdprtx.png'
},
{
  logo: 'https://res.cloudinary.com/dmqjqn6x3/image/upload/v1749332739/photo_2023-07-10_19-26-25_idvz61.jpg'
}, {
  logo: 'https://res.cloudinary.com/dmqjqn6x3/image/upload/ilsapart_1_jv34y0.jpg'
}, {
  logo: 'https://res.cloudinary.com/dmqjqn6x3/image/upload/ilsapart_9_dqyddo.jpg'
}, {
  logo: 'https://res.cloudinary.com/dmqjqn6x3/image/upload/v1749332661/14452-removebg-preview_ttt5pw.png'
}, {
  logo: 'https://res.cloudinary.com/dmqjqn6x3/image/upload/v1749332627/Claretian-Website-logo-Fav_v5yppi.png'
}, {
  logo: 'https://res.cloudinary.com/dmqjqn6x3/image/upload/v1749332621/College_of_Medicine_Unilag_Logo-1_ij4xfg.png'
}, {
  logo: 'https://res.cloudinary.com/dmqjqn6x3/image/upload/v1749332617/logo-gcls-1_mla9fh.png'
},
{
  logo: 'https://res.cloudinary.com/dmqjqn6x3/image/upload/WhatsApp_Image_2025-06-13_at_8.20.03_AM_jafuvy.jpg'
}, {
  logo: 'https://res.cloudinary.com/dmqjqn6x3/image/upload/ilsapart_10_lvqbur.jpg'
}, {
  logo: 'https://res.cloudinary.com/dmqjqn6x3/image/upload/ilsapart_4_mkhnpa.jpg'
}, {
  logo: 'https://res.cloudinary.com/dmqjqn6x3/image/upload/ilsapart_5_hlfwuq.jpg'
}, {
  logo: 'https://res.cloudinary.com/dmqjqn6x3/image/upload/ilsapart_6_fupub9.jpg'
},];
export const PartnerCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % (partners.length - 2));
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return <div className="w-full overflow-hidden bg-gradient-to-b from-blue-900/20 to-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-8">
      <div className="relative">
        <div className="flex transition-transform duration-500 ease-in-out" style={{
        transform: `translateX(-${currentIndex * (100 / 3)}%)`
      }}>
          {/* Duplicate the partners array for infinite scroll effect */}
          {[...partners, ...partners].map((partner, index) => <div key={index} className="w-1/3 flex-shrink-0 px-4" style={{
          minWidth: 'calc(100% / 3)'
        }}>
              <div className="bg-black/30 rounded-lg p-4 h-56 md:h-40 flex items-center justify-center group hover:bg-black/40 transition-all duration-300">
                <img 
                  src={partner.logo} 
                  className="max-h-48 md:max-h-32 max-w-full w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300" 
                  alt="Partner logo"
                />
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};