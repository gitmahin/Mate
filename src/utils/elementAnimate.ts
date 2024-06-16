export const elementAnimate = (queryname:string, class1AR:string) => {
        
    const element = document.querySelector(queryname) 
    element?.classList.add(class1AR)  
  
  }