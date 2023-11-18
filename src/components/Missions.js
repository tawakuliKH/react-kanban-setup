import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { joinMissions, leaveMissions, getMissions } from './redux/missions/missionsSlice';

const Missions = () => {
  const dispatch = useDispatch();
  const { missions } = useSelector((state) => state.missions);
  useEffect(() => {
    if (missions.length === 0) {
      dispatch(getMissions());
    }
  }, [dispatch, missions.length]);

  const jointHandle = (id) => {
    dispatch(joinMissions(id));
  };

  const leaveHandle = (id) => {
    dispatch(leaveMissions(id));
  };

  return (
    <div>
      <table className="mission-table">
        <thead>
          <>
            <tr>
              <th className="cell-col"> Mission </th>
              <th className="cell-col"> Description </th>
              <th className="cell-col"> Status </th>
              <th className="cell-col"> </th>
            </tr>
          </>
        </thead>
        <tbody>
          {missions.map((mission) => (
            <tr key={mission.mission_id}>
              <td className="mission-title">{mission.mission_name}</td>
              <td className="mission-desc">{mission.description}</td>
              <td className="mission-badge">
                {mission.reserved ? (
                  <div className="member-badge active-member">
                    Active Member
                  </div>
                ) : (
                  <div className="member-badge not-member"> NOT A MEMBER</div>
                )}
              </td>
              <td>
                {mission.reserved ? (
                  <button
                    type="button"
                    className="btn-mission leaveBtn"
                    onClick={() => leaveHandle(mission.mission_id)}
                  >
                    Leave Mission
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-mission joinBtn"
                    onClick={() => jointHandle(mission.mission_id)}
                  >
                    Join Mission
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Missions;
