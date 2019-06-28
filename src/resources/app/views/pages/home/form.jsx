import React from 'react'
import plupload from 'plupload'
import styled, { css } from 'styled-components'

import {
  PrimaryButton,
  Container
} from 'app/ui/elements'

import arryToMap from 'services/array-to-map'

const Wrapper = styled.div`
  display: block;
  margin: auto;
  text-align: center;
`

const MIME_FILE = {
  zip: { title: 'Zip files', extensions: 'zip' },
  images: { title : 'Image files', extensions : 'jpg,gif,png' }
}

class UploadForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      files: [],
      templateFile: [],
      mimeType:'zip'
    }

    this.changeMimeType = this.changeMimeType.bind(this)
  }

  uploadTemplate() {
    const plupTemplate = new plupload.Uploader({
      browse_button: 'browseTemplate',
      url: 'http://localhost:3009/image',
      headers: {
        imageType: 'watermark'
      },
      init: {
        FilesAdded: (up, files) => {
          this.setState({ templateFile: arryToMap(files, 'id') })
          this.state.plupTemplate.start()
        },
        UploadProgress: (up, file) => {
          const { templateFile } = this.state
          templateFile[ file.id ].percent = file.percent
          this.setState({ templateFile })
        }
      },
      filters : {
        mime_types: [
          { title : 'Image files', extensions : 'jpg,gif,png' },
        ]
      },
      multi_selection: false
    })

    plupTemplate.init()

    this.setState({
      plupTemplate
    })
  }

  uploadItems(mimeTypes) {
    const plupItems = new plupload.Uploader({
      browse_button: 'browseFiles',
      url: 'http://localhost:3009/image',
      headers: {
        imageType: 'item'
      },
      init: {
        FilesAdded: (up, files) => {
          this.setState({ files: arryToMap(files, 'id') })
          this.state.plupItems.start()
        },
        UploadProgress: (up, file) => {
          const { files } = this.state
          files[ file.id ].percent = file.percent
          this.setState({ files })
        }
      },
      filters: {
        mime_types: [
          mimeTypes
        ]
      }
    })

    plupItems.init(MIME_FILE[ 'zip' ])

    this.setState({
      plupItems
    })
  }

  resetPlupload(mimeType) {
    this.state.plupItems.destroy()
    this.uploadItems(MIME_FILE[ mimeType ])
  }

  componentDidMount() {
    this.uploadTemplate()
    this.uploadItems(MIME_FILE[ 'zip' ])
  }

  changeMimeType(event) {
    const mimeType = event.target.value

    if (mimeType === 'zip') {
      this.resetPlupload(mimeType)

      this.setState({
        mimeType
      })
    } else {
      this.resetPlupload(mimeType)

      this.setState({
        mimeType
      })
    }
  }

  render() {
    const { templateFile, files } = this.state

    const templateUpload = Object.values(templateFile).map((file, index) => {
      return (
        <div key = { index } >
          <p>
            { file.name } { plupload.formatSize(file.size) } => uploaded { file.percent }%
          </p>
        </div>
      )
    })

    const filesUpload =  Object.values(files).map((file, index) => {
      return (
        <div key = { index } >
          <p>
            { file.name } { plupload.formatSize(file.size) } => uploaded { file.percent }%
          </p>
        </div>
      )
    })

    return (
      <Container>
        <div>
          <label>Upload Template</label>
          <br/>
          <Wrapper>
            <PrimaryButton
              id="browseTemplate"
              free={ true }
            >
              Browse Template...
            </PrimaryButton>
          </Wrapper>
        </div>
        <div>
          { templateUpload }
        </div>
        <br/>
        <Wrapper>
          <label> Upload Images</label>
          <input
            type='radio'
            name='zip'
            value='zip'
            onChange={ this.changeMimeType }
            checked={ this.state.mimeType === 'zip' ? true : false  }/>Zip
          <input
            type='radio'
            name='images'
            value='images'
            onChange={ this.changeMimeType }
            checked={ this.state.mimeType === 'images' ? true : false  }/>Multiple Files
          <br/>
          <PrimaryButton id="browseFiles">Browse Files...</PrimaryButton>
        </Wrapper>
        <div>
          { filesUpload }
        </div>
      </Container>
    )
  }
}

export default UploadForm
