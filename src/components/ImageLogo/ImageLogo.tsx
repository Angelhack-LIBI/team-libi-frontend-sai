import styled, { CSSProperties } from 'styled-components'
import { propsToStyle } from "utils";

interface Props {
  image: any
  style?: CSSProperties
}

const ImageLogo: any = styled.div`
  background-image: url(${({ image }: Props) => image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  
  ${(props: Props) => propsToStyle(props.style || {})}
`

export default ImageLogo