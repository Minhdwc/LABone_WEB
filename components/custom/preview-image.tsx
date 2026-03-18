import Image from 'next/image'
import React, { useState } from 'react'

interface PreviewImageProps {
  imageUrl: string
  clsx?: string
}

const PreviewImage: React.FC<PreviewImageProps> = ({ imageUrl, clsx }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className='cursor-pointer h-full w-full' onClick={() => setIsModalOpen(true)}>
        <Image
          width={64}
          height={64}
          src={imageUrl}
          alt='Preview'
          className={`h-16 w-16 rounded-full object-cover ${clsx}`}
        />
      </div>

      {isModalOpen && (
        <div
          className='fixed inset-0 flex items-center justify-center z-50'
          style={{ backgroundColor: 'rgba(209, 213, 219, 0.3)' }}
          onClick={() => setIsModalOpen(false)}
        >
          <div className='max-w-3xl max-h-[90vh]'>
            <Image
              width={1000}
              height={1000}
              src={imageUrl}
              alt='Preview'
              className='max-w-full max-h-[90vh] object-contain'
            />
          </div>
        </div>
      )}
    </>
  )
}

export default PreviewImage
