using AutoMapper;
using ManageStorage.DTO;
using ManageStorage.Models;
using System.IO;

namespace ManageStorage.Mapper
{
    public class Imapper : Profile
    {
        public Imapper()
        {
            CreateMap<StorageDTO, Supplier>();
            CreateMap<ProductDTO, Supplier>();
            CreateMap<ProductDTO, Unit>();
        }
    
    }
}
