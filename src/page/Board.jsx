import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import data from '../data/dummy.json'

import DataContext from '../context/DataContext';
import CommentComp from '../components/CommentComp';

// id로 구분하기위해 board에 data 내용이 필요함
export default function Board() {
    // useNavigate를 사용하면 함수를 이용해서 화면이동가능
    const navigate = useNavigate();

    // param으로 들고온 값은 string
    const {id} = useParams();

    // context의 값을 가져옴
    // 삭제를 위해 action 속성도 가져옴
    const {state, action} = useContext(DataContext);
    const {boardlist} = state;

    // 코멘트의 작성할 글을 저장하기위한 공간
    const [text, setText] = useState("");

    // 배열의 함수인 find를 이용하여
    // 함수의 조건이 참인 하나의 값을 가져온다
    // find로 가져온 값은 배열안에 있는 하나의 값
    // find로 값을 찾지 못할 경우 undefined 출력 
    // undefined의 값에 속성을 찾으려고하면 >> 오류!
    const boardData = boardlist.find((d)=>(d.id == id))

    // state의 commentlist에서 boardId와 param의 id값이 같은
    // 새로운 배열작성 filter
    const boardCommentlist = state.commentlist.filter(
        (comment)=>(comment.boardId == id)
    )

    // useEffect를 사용해서 boardData값이 undefined면 
    // 오류 페이지 컴퍼넌트로 이동 혹은 목록으로 이동
    // 두번쨰 인자값이 빈 배열이라면 컴퍼넌트 생성시에 실행
    useEffect(()=>{
        if (boardData == undefined) {
            navigate('/boardlist')
        }
    },[])

    // 게시물 삭제 메소드
    const deleteBoard = () => {
        // 1. 현재 id를 들고온다 > useParam을 통해 가져온 id를 들고온다
        // 2. id와 동일한 객체를 제외한 새로운 배열을 만든다
        // filter
        // 일치 비교연산자 사용할떄는 자료형까지 동일해야한다
    const newBoardlist = boardlist.filter((board)=>(board.id !== Number(id)))
        // 3. 새로운 배열을 set메소드를 통해 넣어준다
    action.setBoardlist(newBoardlist);

        // 삭제 이후에 boardlist로 이동
    navigate('/boardlist')
    }

    // 코멘트 추가 메소드
    const addComment = () => {
        // 1. 추가할 코멘트 객체 생성
        const newComment = {
            cid : state.cid,
            boardId : boardData.id,
            text : text,
            date : "2023-04-19",
            writer : state.user.writer
        }
        // 1-1. 값 증가
        action.cidCount();
        
        // 2. 코멘트가 추가된 새로운 배열
        const newCommentlist = state.commentlist.concat(newComment);

        // 3. 새로운 배열을 set메소드를 통해서 값 할당
        action.setCommentlist(newCommentlist)
    }   

    // 코멘트를 삭제하기위한 메소드
    const deleteComment = (cid) => {
        // 1. 삭제/수정을 할때는 값의 id(유일한값)을 통해 확인
        // boardCommentlist의 각 객체에 id가 있음
        // >> map으로 객체를 하나씩 출력할때 id값을 가져옴
        
        // 2. filter를 통해서 id값을 제외한 새로운 배열생성
        // state.commentlist(전체배열)를 통해서 새로운 배열 생성!
        const newCommentlist = state.commentlist.filter(
            (comment)=>(comment.cid !== cid)
        )

        // 3. 그 배열을 set메소드를 통해 값 할당
        action.setCommentlist(newCommentlist);
    }

  return (
    <div>
        {   // 화면이 먼저 화면에 렌더되고, useEffect 실행
            // 화면상에서 나타나는 오류를 제거하고
            // useEffect로 이동 
            boardData && (
                <div>
                    <h3>제목: {boardData.title}</h3>
                    <p>작성자: {boardData.writer}</p>
                    <p>내용: {boardData.content}</p>
                    <p>날짜: {boardData.date}</p>
                </div>
            )
        }
        {/* writer 값이 같을때만 아래 버튼들 보이기-삼항연산자 
            boardData의 값이 있을때 비교!
            먼저는 boardData가 있는지 확인한 후에 출력
            >> 연달아서 확인하기위해 && 연산자 사용
            1) boardData가 있는지 확인 (있으면 T/ 없으면 F)
            2) writer 비교 
        */}
        {
            boardData &&
            state.user.writer === boardData.writer && 
            <div>       
                <button
                onClick={deleteBoard}
                >
                    이 게시글 삭제
                </button>
                <button
                // navigate의 state를 이용하여 boardData 객체를 전달
                onClick={()=>{navigate(`/board-modify-form`, {state: boardData} )}}
                >
                    이 게시글 수정하기
                </button>
            </div>
        }
        <hr />
        {/* 코멘트를 작성할 공간 */}
        <input type="text" 
            onChange={(e)=>{setText(e.target.value)}}
        />
        <button
            onClick={addComment}
        >
            댓글추가
        </button>
        <hr />
        {   // 값을 넘길 형태가 객체로 주어져있으면 객체로 넘길수 있다
            // state의 commentlist를 그대로 쓰게되면 전체가 나옴
            // >> 동일한 boardId를 가진 commentlist를 만들어야함
            boardCommentlist.map((comment)=>(
                <CommentComp 
                key={comment.cid}
                comment={comment}
                deleteComment={deleteComment}
                />
            ))
        }
    </div>
  )
}
