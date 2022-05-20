import { useEffect, useState } from 'react'
import { useStore, observer } from "@store/utils";
import { View } from '@tarojs/components'
import dayjs from 'dayjs'
import './index.scss'

interface IProps {
  text?: string
}

const QUWaterMark = (props: IProps) => {
  const { GlobalStore } = useStore()
  const [watermarkBck, setWatermarkBck] = useState('')

  // 因为安全原因 svg 需转译以便作为背景图使用，也可直接在浏览器中打开
  // 因为要保留 xvg 可读性，所以使用自定义方法进行转义
  const svgToUrl = str => {
    return `data:image/svg+xml,${str
      .replace(/\n/g, '')
      .replace(/<!--(.*)-->/g, '') // 必须去掉注释
      .replace(/[\r\n]/g, ' ') // 最好去掉换行
      .replace(/"/g, "'") // 单引号是保留字符，双引号改成单引号减少编码
      .replace(/%/g, '%25')
      .replace(/&/g, '%26')
      .replace(/#/g, '%23')
      .replace(/{/g, '%7B')
      .replace(/}/g, '%7D')
      .replace(/</g, '%3C')
      .replace(/>/g, '%3E')}`;
  };


  /**
   * 生成 svg 字符串
   * text 水印文字
   * <text> 属性（x y transform） 方向位置按需调整
   * <svg> 中fill属性决定字体颜色
   */
  const getCanvasUrl = (user) => {
    const options = {
      width: 187.5,
      height: 112.5,
      fontSize: 16,
      color: 'rgb(204,204,204)',
      fontFamily: 'inherit',
    };
    return `<svg
     width="${options.width}"
     height="${options.height}"
     fill="${options.color}"
     xmlns="http://www.w3.org/2000/svg"
   >
     <text
       x="45%"
       y="85%"
       transform="rotate(40, 160 110)"
     width="${options.width}"
     font-size="${options.fontSize}"
       font-family="${options.fontFamily}"
       font-weight="400"
       text-anchor="middle"
       dominant-baseline="middle"
     >${user}</text>
     <text
     x="45%"
     y="85%"
     transform="rotate(40, 140 100)"
     font-size="13"
     font-weight="400"
     font-family="${options.fontFamily}"
     text-anchor="middle"
     dominant-baseline="middle"
   >${dayjs(new Date()).format('YYYY-MM-DD HH:mm')}</text>
   </svg>`;
  };
  useEffect(() => {
    const name = props.text || GlobalStore.customerName
    setWatermarkBck(`background: url("${svgToUrl(getCanvasUrl(name))}") repeat`)
  }, [GlobalStore.customerName])

  return <View className='waterMark' style={watermarkBck} />
};

export default observer(QUWaterMark)
