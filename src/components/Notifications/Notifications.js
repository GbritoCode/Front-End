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

  console.log(notify);
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
        {notify.map(notification => (
          <NavLink onClick={e => e.preventDefault} tag="li">
            <DropdownItem toggle={false} className="nav-item">
              {notification.content}A-0060 <br />
              PREMIER0001 <br />
              IMPLANTAÇÃO MÓDULO MANUTENÇÃO INDUSTRIAL
              <p className="notificationTime"> {notification.timeDistance} </p>
              {notification.read ? (
                <></>
              ) : (
                <button
                  type="button"
                  onClick={() => handleMarkasRead(notification._id)}
                  className="notificationMarkAsRead"
                >
                  Marcar como lida
                </button>
              )}
            </DropdownItem>
          </NavLink>
        ))}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}
