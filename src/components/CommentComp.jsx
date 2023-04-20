import React from 'react'

// 삭제버튼에 쓸 메소드를 Board에서 작성후 전달해서 사용
// >> state와 action을 필요한 공간에서 쓰기 위함
export default function CommentComp(props) {
    // props로 전달한 comment를 구조분해를 통해서 쓰기 쉽게 작성
    const {writer, text, date, cid} = props.comment
    // 작성한 메소드를 들고와서 사용
    const {deleteComment} = props
  return (
    <div>
        <h5>{cid}/{writer}</h5>
        <p>
            {text}
            <button
                // 메소드를 사용할때, cid 전달해야함
                // ()=>{} 화살표 함수로 감싸서 사용
                onClick={()=>{ deleteComment(cid)}}
            >
                X
            </button>
        </p>
        <span>{date}</span>
    </div>
  )
}
