import React from 'react';

function GoodDes(props){
    const {data} = props;
    return (
        <div>
            {
                data?
                <React.Fragment>
                    <div className='taste'>
                    {data[0].map(item=>(<p key={item.gid}>
                        <span>{`${item.french} ${item.name}`}</span>
                        <span>{item.value}</span>
                    </p>))}

                    </div>
                    <div className='country'>
                    {
                    data[1].list.map((item,index)=>(
                        <span key={index}>
                            <img src={`${data[1].url}${item.img}`} />
                            {item.name}</span>
                    ))}
                        
                    </div>
                    
                    {
                    (()=>{
                        return <div className="datail-img" dangerouslySetInnerHTML={{ __html:data[2]}}></div>
                    })()
                    }
                </React.Fragment>:''
            }
            
        </div>
    )
}

export default GoodDes;