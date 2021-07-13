import FormInfo from "./forminfo";
import { createCanvas, loadImage } from 'canvas'
import CardResult from "./cardResult";
import QRCode  from "qrcode";
import pannel from "./pannel.png"
import { FacebookShareButton } from "react-share";

const { Component } = require("react");

class CardCreator extends Component {
    constructor (props) {
        super(props);

        this.state = {
            card: "",
            display: false
        }

        this.imge = "";

        this.wrapText = this.wrapText.bind(this);
        this.CreatingCard = this.CreatingCard.bind(this);

    } 

    wrapText(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        context.fillText(line, x, y);
    }
    
    CreatingCard = (person) => {
        console.log(person);
        //const qrCode = useQrCode(person.id+";"+person.name+";"+person.clan);
        var qrcode = "";
        QRCode.toDataURL(person.id+";"+person.name+";"+person.clan,{errorCorrectionLevel: 'L', width:'90px'} ,function (err, url) {
            qrcode = url;
        })
        const canvas = createCanvas(600, 300);
        const ctx = canvas.getContext('2d');
        
        loadImage(pannel).then((image) => {
            ctx.drawImage(image, 0,0);
        
            ctx.fillStyle = "white"
            ctx.font ='bold 24px monospace'
            ctx.fillText("ID CARD",243, 45)
            
            ctx.font = '20px monospace'
            ctx.fillText("Họ và Tên: " + person.name, 188,96)
            ctx.fillText("ID: " + person.id, 188,136)
            ctx.fillText("CLAN: " + person.clan, 188,176)

            ctx.font = '15px monospace'
            var text = "Description: " + person.description
            
            this.wrapText(ctx, text, 191, 211, 360, 20);

            loadImage(person.image).then((image2) => {
                ctx.drawImage(image2, 23,62, 150, 200);

                loadImage(qrcode).then((image3) => {
                    ctx.drawImage(image3, 510,0, 90, 90);
                    const img = canvas.toDataURL()
                    this.setState({
                        card :  img
                    })
                })
            })
        })
    }

    saveAs = (blob, fileName) =>{
        var elem = window.document.createElement('a');
        elem.href = blob
        elem.download = fileName;
        elem.style = 'display:none;';
        (document.body || document.documentElement).appendChild(elem);
        if (typeof elem.click === 'function') {
            elem.click();
        } else {
            elem.target = '_blank';
            elem.dispatchEvent(new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
            }));
        }
        URL.revokeObjectURL(elem.href);
        elem.remove()
    }

    sharefb = () =>{
        console.log("share");
    }

    download = () =>{
        console.log("download");        
        this.saveAs(this.state.card, 'exported-vis.png') 
    }

    render () {
        return (
            <div id="cardCreator">
                <FormInfo handleData={this.CreatingCard}></FormInfo>
                {this.state.card !== "" ?
                    <div>
                        <div>
                            <CardResult card={this.state.card}/>
                        </div>

                        <div id="sharearea" >
                            <ul className="list-inline text-center">
                                <li className="list-inline-item">
                                    <img onClick={this.sharefb} className="shareicon fb" src="assets/img/_Path_.svg"/>
                                </li>
                                <li className="list-inline-item"><img onClick={this.download} className="shareicon dl" src="assets/img/_Path_%20(1).svg"/></li>
                            </ul>
                        </div>
                    </div>  :
                    <div></div>  
                }
                 
            </div>
        );
    }
}

export default CardCreator;
//<img onClick={this.sharefb} className="shareicon fb" src="assets/img/_Path_.svg"/>