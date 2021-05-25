import React, { useEffect, useState, useMemo } from "react";
// nodejs library that concatenates classes

// reactstrap components
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavLink
} from "reactstrap";

import { formatDistance, parseISO } from "date-fns";
import pt from "date-fns/locale/pt";
import { Tooltip } from "@material-ui/core";
import api from "~/services/api";
import { store } from "~/store";

export default function Notifications() {
  const [notify, setNotify] = useState([]);

  useEffect(() => {
    const { id: idColab } = store.getState().auth.user.Colab;
    async function loadNotifications() {
      const response = await api.get(`/notifications/${idColab}`);

      const data = response.data.map(notification => ({
        ...notification,
        timeDistance: formatDistance(
          parseISO(notification.createdAt),
          new Date(),
          { includeSeconds: true, addSuffix: true, locale: pt }
        )
      }));
      setNotify(data);
    }
    loadNotifications();
  }, []);

  const hasUnread = useMemo(
    () => !!notify.find(notification => notification.read === false),
    [notify]
  );

  const handleMarkasRead = async id => {
    await api.put(`notifications/${id}`);

    setNotify(
      notify.map(notification =>
        notification._id === id ? { ...notification, read: true } : notification
      )
    );
  };
  return (
    <UncontrolledDropdown nav>
      <DropdownToggle caret color="default" data-toggle="dropdown" nav>
        {hasUnread ? (
          <div className="notification d-none d-lg-block d-xl-block" />
        ) : (
          <></>
        )}

        <i className="tim-icons icon-sound-wave" />
        <p className="d-lg-none">Notifications</p>
      </DropdownToggle>
      <DropdownMenu className="dropdown-navbar" right tag="ul">
        {notify.length === 0 ? (
          <>
            <NavLink onClick={e => e.preventDefault} tag="li">
              <DropdownItem toggle={false} className="nav-item">
                <div className="testando">
                  <p>Não há notificações</p>
                </div>
              </DropdownItem>
            </NavLink>
          </>
        ) : (
          notify.map(notification => (
            <NavLink
              key={notification._id}
              onClick={e => e.preventDefault}
              tag="li"
            >
              <DropdownItem toggle={false} className="nav-item">
                <div className="testando">
                  {notification.content.split(",")[0]}
                  <p />
                  {notification.content.split(",")[1]}
                  <br />

                  {notification.content.split(",")[2]}
                </div>
                {notification.read ? (
                  <>
                    <p className="notificationTimeRead">
                      {" "}
                      {notification.timeDistance}{" "}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="notificationTimeUnread">
                      {" "}
                      {notification.timeDistance}{" "}
                    </p>
                  </>
                )}
                {notification.read ? (
                  <></>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleMarkasRead(notification._id)}
                    className="notificationMarkAsRead"
                  >
                    <Tooltip title="Marcar como lida">
                      <i className="tim-icons icon-check-2" />
                    </Tooltip>
                  </button>
                )}
              </DropdownItem>
            </NavLink>
          ))
        )}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}
