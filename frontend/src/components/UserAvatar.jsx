import { Avatar, Tooltip } from '@mui/material';

const UserAvatar = ({ user, onClick, sx = {}, size = 36, tooltip = true }) => {
  const initials = user?.username?.[0]?.toUpperCase() || '?';
  const label = user?.username || 'User';
  const src = user?.id ? `https://avatar.iran.liara.run/public/${user.id}` : undefined;

  const avatar = (
    <Avatar
      src={src}
      sx={{
        width: size,
        height: size,
        bgcolor: 'primary.main',
        cursor: onClick ? 'pointer' : 'default',
        ...sx,
      }}
      onClick={onClick}
    >
      {initials}
    </Avatar>
  );

  return tooltip ? (
    <Tooltip title={label}>{avatar}</Tooltip>
  ) : (
    avatar
  );
};

export default UserAvatar;