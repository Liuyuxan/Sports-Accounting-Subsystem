import YXrequest from "../request"

export function getRankInfos(sportId) {
  return YXrequest.get({
    url: `/SportInfo/personal/${sportId}`,
    // params: {
    //   sportId
    // }
  })
}
