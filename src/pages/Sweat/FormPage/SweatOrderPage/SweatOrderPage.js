import { useEffect, useState } from 'react';
import { useAllParametersGET } from '../../../../routes/sweatRoutes';
import './SweatOrderPage.css';
import { InputSelect, SlideImage } from '../../../../Components';

const SweatOrderPage = () => {
    const get = useAllParametersGET();

    const [ data, setData ] = useState([]); 
    const [ promoFilter, setPromoFilter ] = useState('');
    const [ colorFilter, setColorFilter] = useState({});
    const [ sizeFilter, setSizeFilter ] = useState('');
    const [ selectedID, setSelectedID ] = useState('');
    const [ fileList, setFileList ] = useState([]);

    const [ promoList, setPromoList ] = useState([]);
    const [ colorList, setColorList ] = useState([]);
    const [ sizeList, setSizeList ] = useState(['S', 'M', 'L', 'XL', '2XL']);

    const updateData = async () => {
        const data = await get();
        setData(data);
    }

    useEffect(() => {
        updateData();
    }, [])

    useEffect(() => {
        let newPromList = [];
        data.forEach(sweat => {
            if(!newPromList.includes(sweat.promo)) {
                newPromList.push(sweat.promo);
            }
        })
        setPromoList(newPromList);
    },[data])

    useEffect(() => {
        setPromoFilter(promoList[0])
    }, [promoList])

    useEffect(() => {
        const newColorList = [];
        data.forEach((sweat) => {
            if(sweat.promo === promoFilter && !newColorList.includes(sweat.color)) {
                newColorList.push(sweat.color);
            }
        })
        setColorList(newColorList);
    }, [promoFilter]);

    useEffect(() => {
        if(colorList.includes(colorFilter)) {
            return;
        } else {
            setColorFilter(colorList[0]);
        }
    }, [colorList])

    useEffect(() => {
        console.log(promoFilter + ' ' + colorFilter?.name);
        if(data.filter((sweat) => sweat.color === colorFilter && sweat.promo === promoFilter).length > 0) {
            const sweat = data.find((sweat) => sweat.color === colorFilter && sweat.promo === promoFilter);
            console.log('SWEAT : ', sweat);
            setSelectedID(sweat.id);
            setFileList(sweat.filenames);

        }
    }, [colorFilter, promoFilter]);
    
    return(
        <div className='sweat-order-page container'>
            <SlideImage filenames={fileList} />
            <div>
                <InputSelect
                    label='promo'
                    id='SweatPromoInput'
                    options={promoList}
                    selectedOption={promoFilter}
                    onChange={(value) => {setPromoFilter(value)}}
                />
                <InputSelect
                    label='couleur'
                    id='SweatColorInput'
                    type='color'
                    options={colorList}
                    selectedOption={colorFilter?.name}
                    onChange={(value) => setColorFilter(colorList.find((color => color.name === value)))}
                />
                <InputSelect
                    label='taille'
                    id='SweatSizeInput'
                    type='text'
                    options={sizeList}
                    onChange={value => setSizeFilter(sizeList)}
                />

            </div>
        </div>
    )
}

export default SweatOrderPage;