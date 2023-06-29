import React from 'react';
const vv = require('../media/videos/CrossGuateTL.mp4')

const Home = () => {
  return (
    <div className='w-50 mx-auto'>
      <h1>Welcome Home</h1>

      <video controls>
        <source src={vv} type="video/mp4" />
        {/* ניתן להוסיף גם מקורות אחרים של סרטון */}
        {/* <source src="/media/myVideo.webm" type="video/webm" /> */}
        {/* <source src="/media/myVideo.ogg" type="video/ogg" /> */}
        Your browser does not support the video tag.
      </video>

<br /><br />
      <label>הוסף תמונה:</label> <br />
      <input className="mb-2" type="file" accept=".jpg,.jpeg,.png" /* onChange={handleImageChange} */ />
    </div>
  )
}

export default Home