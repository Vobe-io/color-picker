import * as React from 'react';
import { Component } from 'react';

import iro from '@jaames/iro';
import { MdContentCopy } from "react-icons/md";

import Style from 'style/color-picker.module.sass';

enum Modes {
  RGB,
  HEX,
  HSV,
}

interface Properties {
  size?: number
}

interface States {
  currentInfo: string,
  mode: Modes
}

class ColorPicker extends Component<Properties, States> {

  private initInfo: string;
  private colorPicker: iro.ColorPicker | any;

  constructor(props: Properties) {
    super(props);
    this.initInfo = "#ffffff";
    this.state = {
      currentInfo: this.initInfo,
      mode: Modes.HEX
    };
  }

  componentDidMount() {
    this.colorPicker = new (iro.ColorPicker as any)('#parent', {
      width: this.props.size,
      color: this.initInfo
    });
    this.colorPicker.on('color:change', (color: any) => {
      this.updateInfo(this.state.mode);
    })
  }

  updateInfo = (mode: Modes) => {
    switch(mode) {
      case Modes.RGB: {
        this.setState({mode: Modes.RGB, currentInfo: this.colorPicker.color.rgbString});
        break;
      }
      case Modes.HEX: {
        this.setState({mode: Modes.HEX, currentInfo: this.colorPicker.color.hexString});
        break;
      }
      case Modes.HSV: {
        this.setState({mode: Modes.HSV, currentInfo: JSON.stringify(this.colorPicker.color.hsv)});
        break;
      }
      default: {
        this.setState({currentInfo: "Unknown Mode"});
      }
    };
  }

  copyTextToClipboard = (text: string) => {
    if(!navigator.clipboard) {
      alert("Sorry but your Browser doesn't support copying to clipboard");
      return;
    }
    navigator.clipboard.writeText(text);
  }

  render() {
    return (
      <div className={Style.ColorPicker}>
        <div className={Style.Row2}>  
          <div className={Style.fillLeft}></div>
          <div className={Style.parent} id="parent"></div>
          <div className={Style.fillRight}>
            <div className={Style.colorInfo}>
              <div className={Style.colorInfoValue}>
                {this.state.currentInfo}
                <MdContentCopy onClick={() => this.copyTextToClipboard(this.state.currentInfo)} className={Style.copyIcon} />
                </div>
              <div className={Style.colorInfoChange}>
                <div onClick={() => this.updateInfo(Modes.RGB)} className={this.state.mode === Modes.RGB ? Style.changeButtonActive : undefined}>RGB</div>
                <div onClick={() => this.updateInfo(Modes.HEX)} className={this.state.mode === Modes.HEX ? Style.changeButtonActive : undefined}>HEX</div>
                <div onClick={() => this.updateInfo(Modes.HSV)} className={this.state.mode === Modes.HSV ? Style.changeButtonActive : undefined}>HSV</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ColorPicker;
