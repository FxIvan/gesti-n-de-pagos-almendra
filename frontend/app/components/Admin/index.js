"use client";

export default function PanelAdmin({ session }) {
  return (
    <div>
      <div>{session.accessToken} </div>
    </div>
  );
}
