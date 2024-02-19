import cartaz from "./cartaz.jpg";

export const EventoOrganizadorStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid rgba(0,0,0,0.09)',
    boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
    width: '80%',
    height: '100px',
    marginTop: '25px',
    borderRadius: '1rem',
}

export const BoxEventoImageInfoStyle = {
    display: 'flex',
    flexDirection: 'row',
}

export const BoxEventoInfoStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 0.5
}

export const NomeEventoStyle = {
    marginTop: 1.2,
    color: 'rgba(0,0,0,0.7)',
}

export const BoxImagemStyle = {
    position: 'relative',
    left: -17,
    backgroundImage: `url("${cartaz}")`,
    borderRadius: '1rem 0.5rem 0.5rem 1rem',
    height: '90px',
    width: '150px',
    backgroundSize: 'cover',
}

export const BoxIconesStyle = {
    display: 'flex',
    flexDirection: 'row'
}

export const ChipStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    alignSelf: 'start',
    fontSize: '0.75rem'
}