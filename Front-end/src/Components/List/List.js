import "./List.css"
import ListItem from "../ListItem/ListItem";
import { ChevronRight,ChevronLeft } from 'react-bootstrap-icons';
import { useRef,useState } from "react";

export default function List({list}){

    const listRef = useRef()
    const [slideNumber,setSlideNumber] = useState(0);
    const [isMoved,setIsMoved] = useState(false);


   // console.log(list.content[0].length)
    // list.content.map((item)=>
    // console.log(item)
    // )
    const handleClick =(direction)=>{

        setIsMoved(true)
        let distance = listRef.current.getBoundingClientRect().x -50

        if(direction === "left" && slideNumber > 0){
            setSlideNumber(slideNumber-1);
            listRef.current.style.transform =`translateX(${distance + 230}px)`
        }

        else if(direction === "right" && slideNumber < list.content[0].length - 6){
            setSlideNumber(slideNumber+1);
            listRef.current.style.transform =`translateX(${distance - 230}px)`
        }
    }
    return(
        <div className="list">
            <span className="listTitle">
                 {list.title}
            </span>
            <div className="myParent">
                <ChevronLeft className="sliderArrow left" onClick={()=>handleClick("left")} style={{display: !isMoved && "none"}}/>
                    <div className="wrapper" ref={listRef}>
                    {/* <ul>
                        {items.map((item, index) => <li key={index}>{item.name}</li>)}
                    </ul> */}
                    {/* Index which is send ti list item */}
                    {console.log(list.content[0])}
                        {list.content.map((item,index)=>(
                             <ListItem key={index} index={index} item={item}/>
                        ) )}

    

                        {/* <ListItem index={1}/>
                        <ListItem index={2}/>
                        <ListItem index={3}/>
                        <ListItem index={4}/>
                        <ListItem index={5}/>
                        <ListItem index={6}/>
                        <ListItem index={7}/>
                        <ListItem index={8}/>
                        <ListItem index={9}/> */}
                    </div>
                <ChevronRight className="sliderArrow right" onClick={()=>handleClick("right")}/>
            </div>
        </div>
    )
}