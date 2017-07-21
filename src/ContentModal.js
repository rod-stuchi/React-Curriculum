import React, { Component } from 'react';
import Modal        from 'react-modal';
import IconPlay     from 'react-icons/lib/fa/play-circle';
import IconImg      from 'react-icons/lib/fa/image';
import IconClose    from 'react-icons/lib/fa/close';
import IconYouTube  from 'react-icons/lib/fa/youtube-play';

class ContentModal extends Component {
  constructor(props) {
    super();
    this.state = {
      modalIsOpen: props.show
    }

    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  openModal(e) {
    this.setState({modalIsOpen: true});
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    e.preventDefault();
    return false;
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  typeContent() {
    if (['gif', 'jpg'].indexOf(this.props.type) >= 0) {
      return <img src={this.props.href} alt={this.props.link} />
    } else if ( this.props.type === 'youtube') {
      // width="640" height="360"
      return (
        <iframe id="ytplayer" type="text/html" style={{width: '80vw', height: 'calc(80vh - 40px)'}}
          src={this.props.href} frameBorder="0" allowFullScreen/>
      )
    }
  }

  typeLink() {
    return (
      <span onClick={this.openModal}>
        <a href={this.props.href}>{(() => {
          switch(this.props.type) {
            case 'gif':
              return <IconPlay/>
            case 'jpg':
              return <IconImg/>
            case 'youtube':
              return <IconYouTube/>
            default:
              return ''
          }
        })()} {this.props.link}
      </a>
      </span>)
  }

  render() {
    return (
      <span>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={{
          content : {
            top         : '50%',
            left        : '50%',
            right       : 'auto',
            bottom      : 'auto',
            marginRight : '-50%',
            transform   : 'translate(-50%, -50%)',
            padding     : '8px',
            border      : '1px solid gray',
            maxWidth    : '80vw',
            maxHeight   : '80vh'
            }
          }}
          contentLabel="Modal"
        >
          <span
            style={{
              display   : 'block',
              width     : '100%',
              textAlign : 'right',
              cursor    : 'pointer',
              fontSize  : '110%',
              margin    : '0 0 10px 0'
            }}
            onClick={this.closeModal}
          ><IconClose/></span>
          {this.typeContent()}
        </Modal>
        {this.typeLink()}
      </span>
    )
  }
}

export default ContentModal;
