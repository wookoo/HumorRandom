import React, { Component } from 'react';
import axios from 'axios';
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      url: '',
      comments:[],
      writter: '',
      year:'',
      month:'',
      day:'',
      hour:'',
      min:'',
      choice:[],
    }
    this._handleOnClickAddItem = this._handleOnClickAddItem.bind(this)
    this._handleOnChangeUrlInput = this._handleOnChangeUrlInput.bind(this)
    this._handleOnClickCancel = this._handleOnClickCancel.bind(this)
    this._handleOnClickRemove = this._handleOnClickRemove.bind(this)
    this._handleOnChangeDate = this._handleOnChangeDate.bind(this)
    this._handleOnChangeTime = this._handleOnChangeTime.bind(this)
    this._handleOnClickRandom = this._handleOnClickRandom.bind(this)
  }

  async _handleOnClickAddItem () {
    const { url,year,month,day,hour,min } = this.state
    if (url.length === 0 || year.length ===0 || hour.length === 0) return alert('입력을 입력해주세요.')
    //console.log("어싱크");
    const result = await axios.get("http://172.30.1.31:2000",{params:{
      url :url,
      year:year,
      month:month,
      day:day,
      hour:hour,
      min:min,
      
}
  });
  let response = result.data.status;
  if(response === "ok"){
    let writter = result.data.writter;
    let comments = result.data.comments;
    this.setState({ writter: writter, comments: comments,choice:[] })
    alert("명단을 가져왔습니다!");
  }else{
    this.setState ({
      url: '',
      comments:[],
      writter: '',
      year:'',
      month:'',
      day:'',
      hour:'',
      min:'',
      choice:[],
    });
    return alert("입력을 확인해주세요 !");
  }


  }
  _handleOnClickRandom(){
    const {choice,comments} = this.state;
    let size = comments.length;
    if(size === 0){
      return alert("뽑을 사람이 없습니다 !");
    }
    let index = Math.floor(Math.random()*size);
    let choiced = comments[index];

    const newComments = comments.filter(item=> item !== choiced);
    choice.push(choiced);
    alert(choiced + ` 님이 뽑혔습니다 !`);
    this.setState({ comments: newComments })

  }
  _handleOnChangeTime (e) {
    let Time = e.target.value;
    Time = Time.split(":");
    this.setState({hour:Time[0], min :Time[1]});

  }


  _handleOnChangeUrlInput (e) {
    this.setState({ url: e.target.value })

  }

  _handleOnChangeDate (e) {
    //this.setState({ url: e.target.value })
    let date = e.target.value;
    date = date.split('-');

    this.setState({year: date[0],month:date[1],day:date[2]});

    //스플릿해서 설정
  }

  _handleOnClickCancel (id) { // index에 해당하는 아이템의 isCompleted 를 토글한다.
    const choice = window.confirm(id + `님을  당첨자 목록에서 삭제 할까요?`);
    if (choice){
      const { choice,comments } = this.state
      const newChoice = choice.filter(item=> item !== id);
      comments.push(id)
      this.setState({ choice: newChoice })
  
    }
  

  }

  _handleOnClickRemove (id) {
    const choice = window.confirm(id + `님을 뽑기 목록에서 삭제 할까요?`);
    if (choice){
      const { comments } = this.state
      const newComments = comments.filter(item=> item !== id);
      this.setState({ comments: newComments })
    }
    
    
  }

  render () {
    const renderCancelButton = item => (
      <button
        className='btn btn-danger btn-sm'
        style={{ marginLeft: 5 }}
        onClick={() => this._handleOnClickRemove(item)}
      >
        삭제
      </button>
    )
    return (
      <div className='container' style={{ maxWidth: 600, padding: '20px'}}>
        <div className='row'>
          <div className='col text-center'>
            
            <div className='input-group'>
              <span style={{width:100}}>
              URL
              </span>
              <input
                type='text'
                className='form-control'
                placeholder='웃대에서 복사한 단축 URL '
                style={{height:30}}
                onChange={this._handleOnChangeUrlInput}
          
              />
            </div>
            <div className='input-group'>
            <span style={{width:100}}>
              마감일
              </span>
              <input
                type='date'
                className='form-control'

                style={{height:30}}
                onChange={this._handleOnChangeDate}
          
              />
              <div className='input-group'>
              <span style={{width:100}}>
              마감시간
              </span>
              <input
                type='time'
                className='form-control'
                style={{height:30}}

                onChange={this._handleOnChangeTime}

        
              />
              </div>
              
              <div className='input-group' >
                <button
                  className='btn btn-outline-secondary'
                  onClick={this._handleOnClickAddItem}
                  style={{ width: '100%'}}
                >
                  명단 가져오기
                </button>
              </div>
              
            </div>
            <div className='input-group' > 
              <button
                  className='btn btn-outline-secondary'
                  style={{ width: '100%'}}
                  onClick={this._handleOnClickRandom}
                >
                  랜덤뽑기
                </button>
            </div>
           
        
          </div>
        </div>
        <div className='row' style={{ marginTop: 20 }}>
          <div className='col-6'>
            <h3>뽑힐사람</h3>
            {
              this.state.comments.map(item =>
                <div style={{ margin: 10 }}>
                  <span style={{ marginRight: 5 }}> {item}</span>
                
                  {renderCancelButton(item)}
                </div>
              )
            }
          </div>
          <div className='col-6'>
            <h3>뽑은사람</h3>
            {
              this.state.choice.map(item =>
                <div key={item.id} style={{ margin: 10 }}>
                  <span style={{ marginRight: 5 }}>{item}</span>
                  <button
                    className='btn btn-warning btn-sm'
                    onClick={() => this._handleOnClickCancel(item)}
                  >
                    취소
                  </button>
      
                </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;