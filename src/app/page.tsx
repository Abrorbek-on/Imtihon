import React from 'react'
import Group from './group/page'
import Leads from './leads/page'
import Course from './course/page'
import Teacher from './teacher/page'
import Xona from './xona/page'
import Talabalar from './talabalar/page'
import LoginPage from './login/page'

function page() {
  return (
    <>
      <Leads />
      <Group />
      <Course />
      <Teacher />
      <Xona />
      <Talabalar />
      <LoginPage />
    </>
  )
}

export default page