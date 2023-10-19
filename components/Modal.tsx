"use client"

import { useRouter } from "next/navigation"
import { useCallback, useRef, ReactNode } from "react"
import Image from "next/image"

const Modal = ({children}: {children: ReactNode}) => {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
//   useMemo and useCallback only runs a certain function when their's a change to their dependency array. 
//use cases: referential equality, slow function
// The difference is that useMemo returns value of the function
// useCallback returns the whole function,
// in a case where we need to use that function and put some params in it it could work on use callback
  const onDismiss = useCallback(() => { 
    router.push('/');
   }, [router])

  const handleClick = useCallback((e: React.MouseEvent) => {
    if(e.target === overlay.current && onDismiss){
        onDismiss();
    }
  }, [onDismiss, overlay])
 

    return (
    <div ref={overlay} className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/80" onClick={handleClick}>
            <button className="absolute top-4 right-8" 
            type="button" onClick={onDismiss}>
                <Image src="/close.svg"  width={17} height={17} alt="close" />
            </button>

        <div ref={wrapper} className="flex justify-start items-center flex-col absolute h-[95%] w-full bottom-0 bg-white rounded-t-3xl lg:px-40 px-8 pt-14 pb-72 overflow-auto">
            {children}
            
        </div>
    </div>
  )
}

export default Modal