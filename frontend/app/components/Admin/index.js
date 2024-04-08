"use client";

export default function PanelAdmin({ session, data }) {
  console.log("Data:", data);
  return (
    <div>
      <div>{session.accessToken} </div>
    </div>
  );
}
