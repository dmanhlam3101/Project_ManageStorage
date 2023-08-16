using AutoMapper;
using ManageStorage.DTO;
using ManageStorage.Models;

namespace ManageStorage.Mapper
{
    public class Imapper : Profile
    {
        public Imapper() 
        {
            CreateMap<StorageDTO, Supplier>();

        }
    }
}
