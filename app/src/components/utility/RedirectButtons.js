import {useHistory} from "react-router-dom";

export function ClusterRedirectButton(props) {
  const history = useHistory();

  const Redirect = () => {
    history.push({
      pathname: "/dashboard/cluster",
      state: {
        code: props.code,
        organization: props.organization,
        clusterId: props.id
      }
    });
  }

  return (
    <button onClick={Redirect} className={'btn btn-'+ props.type}>
      {props.innerText}
    </button>
  );

}
